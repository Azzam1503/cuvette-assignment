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
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

const allowedOrigins = ["http://localhost:5173", "https://cuvette-assignment-two.vercel.app"];

// app.use((req, res, next) => {
//     const origin = req.headers.origin;
//     if (allowedOrigins.includes(origin)) {
//         res.setHeader("Access-Control-Allow-Origin", origin);
//     }

//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");  // Allowed HTTP methods
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");  // Allowed request headers
//     res.setHeader("Access-Control-Allow-Credentials", "true");  // Allow credentials like cookies
//     res.setHeader("Access-Control-Max-Age", "600");  // Cache the preflight response for 600 seconds
//     next();
// });


app.get("/", (req, res) => {
    res.send("Hello");
});

app.use("/api/company", compRouter);
app.use("/api/post", postRouter);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})