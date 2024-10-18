import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    titie:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    experienceLevel:{
        type: String,
        requried: true
    },
    endDate:{
        type: Date,
        required: true
    }
});

const Post = mongoose.model("post", postSchema);
export default Post;