import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import compRouter from "./routes/company.route.js";
import postRouter from "./routes/post.route.js";
import { connectDB } from "./config/db.js";
const app = express();
const PORT = 8000;

dotenv.config();
connectDB();
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
    res.send("Hello");
});

app.use("/api/company", compRouter);
app.use("/api/post", postRouter);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})