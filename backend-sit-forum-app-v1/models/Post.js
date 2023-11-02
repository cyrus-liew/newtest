import { Schema, model } from "mongoose";


const PostSchema = new Schema({
    title: { type: String, required:true },
    caption: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    body: { type: Object, required: true },
    photo: { type: String, required: false },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    text: { type: [String],},
    categories: [{type: Schema.Types.ObjectId, ref: "PostCategories"}],

}, {timestamps: true, toJSON: {virtuals: true}});

//define relation
PostSchema.virtual('comments', {
    ref: "Comment",
    localField: "_id",
    foreignField: "post",
});


const Post = model("Post", PostSchema);
export default Post;