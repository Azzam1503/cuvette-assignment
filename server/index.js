import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import compRouter from "./routes/company.route.js";
import postRouter from "./routes/post.route.js";
import cors from "cors";
import { connectDB } from "./config/db.js";
const app = express();
const PORT = 8000;

dotenv.config();
connectDB();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, HEAD, OPTIONS, POST, PUT, DELETE"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    next();
})


app.get("/", (req, res) => {
    res.send("Hello");
});

app.use("/api/company", compRouter);
app.use("/api/post", postRouter);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})