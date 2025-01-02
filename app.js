import express from "express";
import dotenv from 'dotenv';
import connectDB from "./db/database.js";
import userRouter from "./routes/user.js"
import todoRouter from "./routes/todo.js"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
connectDB();
//json bhejna hai toh middleware use karenge and body parser ka bhi use karenge

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use("/api/v1/user",userRouter);
app.use("/api/v1/todo",todoRouter)


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listen at the port ${PORT}`);
})
