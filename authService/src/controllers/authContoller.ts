import { Express,Request,Response,NextFunction } from "express";
import { encryptPassword } from "../utils/encryption";
import { createUserService,findEmailService } from "../services/services";
import {Iuser} from "../interface/Iuser"


export const createUserController = async(
    req:Request,
    res:Response
)=>{
    const {firstName,lastName,password,email} = req.body
    try{
      const findEmail = await findEmailService(email)
      if(findEmail){
        return  res.status(404).json({
            message:"User already exists",
        })
      };
        const hashedPwd = await encryptPassword(password) 
        const user =<Iuser> {
            firstName,
            lastName,
            password:hashedPwd,
            email
        };
        const createUser = await createUserService(user);

        return res.status(201).json({
            message:"User created successfully",
        })

    }catch(error){
        console.log("Error", error);
        return res.status(500).json({Error:"Internal Server error"})
    }



}