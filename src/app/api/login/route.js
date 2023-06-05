"use server"
import { getJwtSecretKey } from "@/lib/auth";
import db from "@/lib/db";
import User from "@/models/User";
import bcrypt from 'bcrypt';
import { SignJWT } from "jose";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req){
    try{
        await db.connect();
        const {email,password}=await req.json();
        const user = await User.findOne({email});
        let isPasswordSame=false;
        if(user){
            isPasswordSame= await bcrypt.compare(password,user.password);
            
        }else{
            console.log('user bulunamadı')
        }
        if(isPasswordSame){

            //generate a token 
            const token =await new SignJWT({
                full_name:user.full_name,
                email:user.email,
                role:user.role,
            }).setProtectedHeader({
                alg:'HS256'
            }).setIssuedAt()
            .setExpirationTime('1h')
            .sign(getJwtSecretKey());
            //set the cookie
            const response=NextResponse.json({
                succes:true,
            });
            response.cookies.set({
                name:'token',
                value:token,
                path:'/'
            });
            response.cookies.set({
                name:'isLoggedIn',
                value:true,
                path:'/'
            });
            revalidatePath('/');
            return response;
        }
        
    }catch(err){
        console.log(err);
    }
}
