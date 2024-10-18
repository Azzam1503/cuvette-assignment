import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import Company from "../models/company.model.js";

export const createCompany = async (req , res) => {
    console.log("Yeah I am called");
    const {username, companyEmail, companyName, companyPhone, employeeSize} = req.body;
    if(!username ||  !companyEmail  || !companyName || !companyPhone  || !employeeSize){
        return res.status(401).json("All fields are required");
    };

    const ifExisting = await Company.findOne({
        $or: [
            { companyEmail },
            { companyPhone }
        ]
    });
    if(ifExisting){
        res.status(401).json({messaage: "Email or Phone number already used"});
    };

    const newComp = await Company.create({
        username,
        companyEmail, 
        companyName, 
        companyPhone, 
        employeeSize
    });

    console.log(newComp);
    return res.status(200).json({success: true, newComp});
};
