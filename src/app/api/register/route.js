"use server"
import db from "@/lib/db";
import User from "@/models/User";
import bcrypt from 'bcrypt';
export async function POST(req){
    try{
        await db.connect();
        const {full_name,email,password:pass,userPhoto}= await req.json();
        
        const isExisting=await User.findOne({email});
        if(isExisting){
            throw Error('Email is already exist');
        }
        const hashedPassword= await bcrypt.hash(pass,10);
        const newUser= await User.create({full_name,email,password:hashedPassword,userPhoto});
        return new Response(JSON.stringify(newUser),{status:201});

    }catch(err){
        console.log(err);
        return new Response(JSON.stringify(err.meesage),{status:404});
    }
}