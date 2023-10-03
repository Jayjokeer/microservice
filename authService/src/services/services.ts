import {UserModel} from "../models/userModel"
import {Iuser} from "../interface/Iuser"


export const createUserService= async(user:Iuser)=>{
    return await UserModel.create(user)
}

export const findEmailService= async (email:string)=>{
    return  await UserModel.findOne({email:email})
}