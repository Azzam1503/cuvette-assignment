import mongoose from "mongoose";

const companySchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    companyEmail: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true,
    },
    companyPhone: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    employeeSize: {
        type: Number
    },
    isPhoneverified: {
        type: Boolean,
        default: false
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    }

},{
    timestamps: true
});

const Company = mongoose.model("company", companySchema);
export default Company;