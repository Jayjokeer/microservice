import express, { urlencoded } from "express";
import {config} from "dotenv";
config();
import morgan from "morgan"
import {connectDB} from "./db";
import authRouter from "./routes/authRoute";
connectDB();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan("dev"))

//routes
app.use('/api/v1/',authRouter);


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT} for auth`);
});



