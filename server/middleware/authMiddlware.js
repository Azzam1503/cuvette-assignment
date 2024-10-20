import jwt from "jsonwebtoken";

const isLoggedIn = async (req, res, next) => {
    try {
        console.log("Token int auth middleware", token);
        const token = req.cookies.token;
        console.log("In the middleware...........")
        if(!token) return res.status(401).json({message: "Authentication failed"});

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message: "Authentication failed"});
        };
        req.company = {
            id: decoded.id,
            companyEmail: decoded.email
        };
        next();
    } catch (error) {
        console.log("Error in auth middlware", error);
        return res.status(401).json({message: "Authentication failed"});

    }
};

export default isLoggedIn;