import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Company from "../models/company.model.js";
import { sendVerifcationCode } from "../config/sendMail.js";


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
    
    const otp =  Math.floor(100000 + Math.random() * 900000).toString(); 

    const newComp = await Company.create({
        username,
        companyEmail, 
        companyName, 
        companyPhone,
        password: hashedPassword, 
        employeeSize,
        verificationCode: otp
    });
    
    sendVerifcationCode(companyEmail, otp);
      
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

        if(company.isEmailVerified === false) return res.status(201).json({isVerified: false, messaage: "Verify your email"});
        const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
        const token = jwt.sign({id: company._id, email: company.companyEmail, exp}, process.env.JWT_SECRET);
        console.log(token);
        res.cookie("token", token, {
            expiresIn : new Date(exp),
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
        });

        return res.status(200).json({message: "Logged In successfully", isVerified: true, data: {
            name: company.companyName,
            email: company.companyEmail,
            isVerified: company.isVerified
        }});
    } catch (error) {
        console.log(error);
    }
}

export const verify = async (req, res) => {
    try {
        const {email, otp} = req.body;
        if(!email || !otp) {
            return res.status(400).json({message: "All fields are required"});
        };

        const company = await Company.findOne({companyEmail: email});

        if(!company){
            return res.status(404).json({message: "Company not found"});
        };

        if(company.verificationCode !== otp){
            return res.status(400).json({ message: "Invalid OTP" });
        };

        company.isEmailVerified = true;
        company.verificationCode = null;
        await company.save();
        return res.status(200).json({ success: true, message: "Company verified successfully" });
    } catch (error) {
        console.log(error);
    }
}


export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if(!email) {
            return res.status(400).json({message: "Email required"});
        };
        
        const company = await Company.findOne({compnayEmail: email});
        if(!company){
            return res.status(404).json({message: "Company not found"});
        };

        const otp =  Math.floor(100000 + Math.random() * 900000).toString(); 

        await sendOtp(email, otp);
        company.verificationCode = otp;
        await company.save();
        return  res.status(200).json({ success: true, message: "Otp send to email"});

    } catch (error) {
        console.log(error);
    }
};

export const logout = async (req, res) =>{
    try {
        console.log("logut called");
        res.clearCookie("token");
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}