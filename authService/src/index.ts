import express, { urlencoded } from "express"
import {config} from "dotenv"
config()
import {connectDB} from "./db"


const app = express()
const PORT = process.env.PORT
app.use(express.json())
app.use(express.urlencoded({extended:true}))

connectDB()
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT} for auth`)
})



