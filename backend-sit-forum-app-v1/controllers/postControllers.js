import { uploadPicture } from "../middleware/uploadPictureMiddleware";
import User from "../models/User"
import { fileRemover } from "../utils/fileRemover";
import Post from "../models/Post";
import { v4 as uuidv4 } from 'uuid';
import Comment from "../models/Comment";

const sanitize = require('mongo-sanitize');


//create post
const createPost = async (req, res, next) => {
    try {
        // const { title, caption, tags, content} = req.body;
        const title = sanitize(req.body.title);
        const caption = sanitize(req.body.caption);
        const tags = sanitize(req.body.tags);
        const content = sanitize(req.body.content);

        const bodyObject =  {
            "type": "doc",
            "content": [
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "type": "text",
                            "text": content
                        }
                    ]
                }
            ]
        };
        const post = new Post({
            title: title,
            caption: caption,
            slug: uuidv4(),
            body: bodyObject,
            photo: "",
            user: req.user._id,
            text: tags,
        });

        const createdPost = await post.save();
        return res.json(createdPost);
    }
    catch (error) {
        // status 500 server internal error
        //return res.status(500).json({message: "something went wrong"});
        next(error);

    }

};


//update Post
const updatePost = async (req, res, next) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug });

        if (!post) {
            const error = new Error("Post are Not Found");
            next(error);
            return;
        }

        const upload = uploadPicture.single('postPicture');

        const handleUpdatePostData = async (data) => {
            const { title, caption, slug, body, tags, categories } = JSON.parse(data);
            post.title = title || post.title;
            post.caption = caption || post.caption;
            post.slug = slug || post.slug;
            post.body = body || post.body;
            post.tags = tags || post.tags;
            post.categories = categories || post.categories;
            const updatedPost = await post.save();

            return res.json(updatedPost);

        }

        upload(req, res, async function (err) {
            if (err) {
                const error = new Error("Unknown error occur when upload image" + err.message);
                next(error);
            } else {
                // if everything when smoothly
                if (req.file) {
                    let filename;
                    //set file name equal avater
                    filename = post.photo;
                    if (filename) {
                        fileRemover(filename);
                    }

                    post.photo = req.file.filename;
                    handleUpdatePostData(req.body.document);
                } else {

                    // if no file is being filled, reset it to empty 
                    let filename;
                    filename = post.photo;
                    post.photo = "";
                    fileRemover(filename);
                    handleUpdatePostData(req.body.document);
                }
            }
        });
    }
    catch (error) {
        // status 500 server internal error
        //return res.status(500).json({message: "something went wrong"});
        next(error);

    }

};

//delete post
const deletePost = async (req, res, next) => {
    try {
        //find and delete post
        const post = await Post.findOneAndDelete({ slug: req.params.slug });

        if (!post) {
            const error = new Error("Post not found");
            return next(error);
        }

        //delete comments
        await Comment.deleteMany({ post: post._id });

        return res.json({
            message: "Post is successfully Deleted",
        })
    }
    catch (error) {
        next(error)
    }
}

//get post
const getPost = async (req, res, next) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug }).populate([
            {
                //to get user data for the post, user comes from the User of the post schema
                path: "user",
                select: ["avater", "name"],

            },
            //get comments with the sam post id, comments is from the virtual property 
            {
                path: "comments",
                // parent equal null, means getting main comment
                match: {
                    check: true,
                    parent: null
                },
                // only for comment of the user not the main post
                populate: [
                    {
                        path: "user",
                        select: ["avater", "name"],
                    },
                    {
                        path: "replies",
                        match: {
                            check: true
                        },
                        populate: [
                            {
                                path: "user",
                                select: ["avater", "name"],
                            }
                        ]
                    }
                ]
            },
        ]);

        if (!post) {
            const error = new Error("Post not found");
            return next(error);
        }
        return res.json(post)
    }
    catch (error) {
        next(error);
    }
};

const getAllPost = async (req, res, next) => {
    try {
        const filter = req.query.searchKeyword;
        let where = {};
        if (filter) {
            where.title = { $regex: filter, $options: "i" };
        }
        let query = Post.find(where);
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * pageSize;
        const total = await Post.find(where).countDocuments();
        const pages = Math.ceil(total / pageSize);
        // res.header("x-filter", filter);
        // res.header("x-totalcount", JSON.stringify(total));
        // res.header("x-currentpage", JSON.stringify(page));
        // res.header("x-pagesize", JSON.stringify(pageSize));
        // res.header("x-totalpagecount", JSON.stringify(pages));
        // res.setHeader("Access-Control-Allow-Origin", "https://forum.bold-chatelet.cloud/");
        res.header({
            // "Access-Control-Allow-Headers":
            // "Origin, X-Requested-With, Content-Type, Accept",
            "x-filter": filter,
            "x-totalcount": JSON.stringify(total),
            "x-currentpage": JSON.stringify(page),
            "x-pagesize": JSON.stringify(pageSize),
            "x-totalpagecount": JSON.stringify(pages),
        });

        if (page > pages) {
            return res.json([]);
        }

        const result = await query
            .skip(skip)
            .limit(pageSize)
            .populate([
                {
                    path: "user",
                    select: ["avater", "name", "verified"],
                },
            ])
            .sort({ updatedAt: "desc" });
        

        return res.json(result);
    } catch (error) {
        next(error);
    }
};
// const posts = await Post.find({}).populate([{
//     path: "user",
//     select: ["avater", "name", "verified"],
// }]);


// res.json(posts);
export { createPost, updatePost, deletePost, getPost, getAllPost };
