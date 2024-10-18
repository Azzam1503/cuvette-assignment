import express from "express";
const app = express();
import dotenv from "dotenv";
const PORT = 8000;
import compRouter from "./routes/company.route.js";
import { connectDB } from "./config/db.js";

dotenv.config();
connectDB();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello");
});

app.use("/api/company", compRouter);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})