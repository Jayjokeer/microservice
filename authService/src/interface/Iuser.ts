export interface Iuser extends Document{
    firstName:string;
    lastName : string;
    email:string;
    password?:string
}
