"use server"
import bcrypt, { hash } from  'bcrypt';
import React from 'react';

export default async function HashPass(password){
    if(!password){
        throw new Error('Password not found!');
    }
   const hashedPassword=await bcrypt.hash(password,10);
   return hashedPassword;
}

