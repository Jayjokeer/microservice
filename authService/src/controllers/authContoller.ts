import { Express,Request,Response,NextFunction } from "express";
import { encryptPassword, verifyPassword } from "../utils/helpers/encryption";
import { createUserService,findEmailService } from "../services/services";
import {Iuser} from "../interface/Iuser";
import { signedUser } from "../middlewares/jwt";


export const createUserController = async(
    req:Request,
    res:Response
)=>{
    const {firstName,lastName,password,email} = req.body
    try{
      const findEmail = await findEmailService(email)
      if(findEmail){
        return  res.status(404).json({
            Error:"User already exists",
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
            createUser
        });

    }catch(error){
        console.log("Error", error);
        return res.status(500).json({Error:"Internal Server error"});
    };
};


export const loginUserController = async(
    req:Request,
    res:Response,
    
)=>{
    const {email,password} = req.body
    try{
        const findEmail = await findEmailService(email)
      if(!findEmail){
        return res.status(403).json({
            Error:"Email or password is incorrect"
        })
      };
      const isVerifiedPassword = await verifyPassword(password, findEmail.password!)
      if(!isVerifiedPassword){
        return res.status(403).json({
            Error:"Email or password is incorrect"
        })
      };
      const payload ={
        firstName:findEmail.firstName,
        lastName:findEmail.lastName,
        email:findEmail.email
    };
    const token = await signedUser(payload);

      return res.status(200).json({
        message:"User logged in successfully",
        token
      })
     
    }catch(error){
        console.log("Error", error);
        return res.status(500).json({Error:"Internal Server error"})
    };
};