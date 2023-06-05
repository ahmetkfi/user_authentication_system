import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    full_name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    userPhoto:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:'user'
    }

},{timestamps:true});

const User=mongoose?.models?.User|| mongoose.model('User',userSchema); 
export default User;