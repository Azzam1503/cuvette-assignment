import Post from "../models/post.model.js";

export const createPost = async (req, res) => {
    try {
        console.log("here I am");
        console.log(req.body);
        const {title, description, experienceLevel, endDate} = req.body;
        if(!title || !description ||  !experienceLevel || !endDate) return res.status(401).json({message: "All field are required"});
        const companyId = req.company;
        const newPost = await Post.create({
            title,
            description, 
            experienceLevel, 
            endDate,
            companyId
        });

        return res.status(200).json({message: "Post created successfully", success: true, newPost});
    } catch (error) {
        console.log(error);
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const allPosts = await Post.find({}).sort({createdAt: -1});
        return res.status(200).json(allPosts);
    } catch (error) {
        console.log(error);
        return res.status(501).json({message: "Error while getting the posts"});
    }
}