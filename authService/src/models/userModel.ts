import { Schema, model, Document } from 'mongoose';
import {Iuser} from "../interface/Iuser"



const userSchema =new Schema<Iuser>({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

export const UserModel = model<Iuser>('User', userSchema);