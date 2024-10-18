import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Company from "../models/company.model.js";


export const createCompany = async (req , res) => {
    try {
        console.log("Yeah I am called");
    const {username, companyEmail, companyName, companyPhone, password, employeeSize} = req.body;
    if(!username ||  !companyEmail  || !companyName || !companyPhone || !password || !employeeSize){
        return res.status(401).json("All fields are required");
    };

    const ifExisting = await Company.findOne({
        $or: [
            { companyEmail },
            { companyPhone }
        ]
    });
    if(ifExisting){
        return res.status(401).json({messaage: "Email or Phone number already used"});
    };
    const saltRounds = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, saltRounds);

    const newComp = await Company.create({
        username,
        companyEmail, 
        companyName, 
        companyPhone,
        password: hashedPassword, 
        employeeSize
    });

    console.log(newComp);
    return res.status(200).json({success: true, message: "Company created successfully"});
    } catch (error) {
        console.log("error in the create user", error);
        return res.status(551).json("All fields are required");
    }
};

export const login = async (req, res) =>{
    try {
        const {email, password} = req.body;
        if(!email || !password) return res.status(401).json("All fields are required");

        const company = await Company.findOne({companyEmail: email});
        if(!company) return res.status(401).json("Invalid credentials");
        const passwordMatch = bcryptjs.compareSync(password, company.password);
        if(!passwordMatch) return res.status(401).json("Incorrect Passowrd");
        console.log("crossed db check");
        const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
        const token = jwt.sign({id: company._id, exp}, process.env.JWT_SECRET);
        console.log(token);
        res.cookie("token", token, {
            expiresIn : new Date(exp),
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
        });

        return res.status(200).json({message: "Logged In successfully"});
    } catch (error) {
        console.log(error);
    }
}