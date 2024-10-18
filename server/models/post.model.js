import mongoose, { Mongoose } from "mongoose";

const postSchema = mongoose.Schema({
    title:{
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
        type: String,
        required: true
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    }
},{
    timestamps: true
});

const Post = mongoose.model("post", postSchema);
export default Post;