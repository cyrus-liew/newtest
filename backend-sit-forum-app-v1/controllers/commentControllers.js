import Post from "../models/Post";
import Comment from "../models/Comment";

const createComment = async (req, res, next) => {

    try
    {
        //slug getting from front end
        const {desc, slug, parent, replyOnUser} = req.body

        // get the post that we found
        const post = await Post.findOne({slug: slug});

        //check post exist anot
        if(!post){
            const error = new Error("Post Not Found");
            return next(error);
        }

        const newComment = new Comment({
            user: req.user._id,
            desc,
            post: post._id,
            parent,
            replyOnUser,
        });

        const savedComment = await newComment.save();
        return res.json(savedComment);
    }
    catch (error)
    {
        next(error)

    }
};

const readAllUncheckComment = async (req, res, next) => {
    try {
        // Find all comments with "check" equal to false
        const comments = await Comment.find({ check: false }).populate('post');
        // Filter out comments where the 'post' object is not found
        const filteredComments = comments.filter(comment => comment.post);

        return res.json(filteredComments);
    } catch (error) {
        next(error);
    }
};

//update comment
const updateComment = async (req, res, next) => {

    try
    {
        //slug getting from front end
        const {desc, check} = req.body
        // get the post that we found
        const comment = await Comment.findById(req.params.commentId);

        //check post exist anot
        if(!comment){
            const error = new Error("Comment Not Found");
            return next(error);
        }

        //update commnet
        comment.desc = desc || comment.desc;
        comment.check = check || comment.check;

        const updateComment = await comment.save();
        return res.json(updateComment);

    }
    catch (error)
    {
        next(error)

    }
};


//ddelete comment
const deleteComment = async (req, res, next) => {

    try
    {
        

        // delete main comment
        const comment = await Comment.findByIdAndDelete(req.params.commentId);
        // delete the replies of the comment
        await Comment.deleteMany({parent: comment._id});

        //check post exist anot
        if(!comment){
            const error = new Error("Comment Not Found");
            return next(error);
        }

        return res.json({
            message: "Comment deleted successfully"
        });

    }
    catch (error)
    {
        next(error)

    }
};

export {createComment, updateComment, deleteComment, readAllUncheckComment}