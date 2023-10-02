import express from "express"
import {config} from "dotenv"
config()
import {connectDB} from "./db"


const app = express()
const PORT = process.env.PORT


connectDB()
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT} order`)
})



