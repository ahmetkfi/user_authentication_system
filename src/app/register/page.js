"use client"
import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import { useRouter,useSearchParams } from "next/navigation";


export default function RegisterPage(){
  const CLOUD_NAME='dtajmsnla';
  const UPLOAD_PRESET='auth_sys_project';
  const router=useRouter();
  const searchParams=useSearchParams();
  const [full_name,setFullName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [repass,setRePass]=useState('');
  const [photo,setPhoto]=useState('');
  const handleSubmit= async (e)=>{
    e.preventDefault();
    if(password.length>0&&full_name.length>0&&email.length>0&&repass.length>0){
      if(password.length<6){
          
            toast.error('Password must be at least 6 charachter!');
            return;
      }else{
        if(password===repass){
          try{
            const userPhoto= await uploadImage();
            const res = await fetch('/api/register',{
              headers: {
                'Content-Type': 'application/json',
              },
              method:'POST',
              body:JSON.stringify({
                full_name,
                email,
                password,
                userPhoto
              })
            });
            if(res.ok){
              const nextUrl=searchParams.get('next');
              router.push(nextUrl?nextUrl:'/login');
            }else{
              toast.error(`Server error!`);
            }
          }catch (err){
              console.log(err);
          }
      }else{
        toast.error('Password do not match!');
      }
      }

    }else{
      toast.error("Fill all fields");       
    }
    
  };
  const uploadImage=async()=>{
    if(!photo)return;

    const formData= new FormData();
    formData.append("file",photo);
    formData.append("upload_preset",UPLOAD_PRESET);
    try{
        const res= await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,{
          method:"POST",
          body:formData
        })
        const data= await res.json();
        const imageUrl=data['secure_url'];

        return imageUrl;
    } catch(err){
        console.log(err);
    }

  }
    return(
        <div className="flex h-screen w-full">
        <div className="w-full flex items-center justify-center lg:w-1/2 ">
        <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-100">
            <h1 className="text-5xl font-semibold">Sign Up</h1>
            <p className="font-medium text-lg text-gray-500 mt-4">
              Please enter your details
            </p>
            <div className="mt-8 ">
              <form>
                <div>
                  <label className="text-lg font-medium">Full Name</label>
                  <input
                    name="full_name"
                    className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                    placeholder="Enter your full name"
                    type="text"
                    value={full_name}
                    id="full_name"
                    onChange={e =>setFullName(e.target.value)}
                  
                  />
                </div>
                <div>
                  <label className="text-lg font-medium">Email</label>
                  <input
                    id="email"
                    className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent "
                    placeholder="Enter your emil"
                    type="email"
                    value={email}
                    onChange={e =>setEmail(e.target.value)}
                    
                    
                  />
                </div>
                <div>
                  <label className="text-lg font-medium">Password</label>
                  <input
                    id="password"
                    className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                    onChange={e =>setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-lg font-medium">
                    Confrim Password
                  </label>
                  <input
                    id="confirm_password"
                    className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                    placeholder="Confrim password"
                    type="password"
                    value={repass}
                    onChange={e=>setRePass(e.target.value)}
                  />
                </div>
                <div className="mt-8">
                  <label className="text-lg font-medium ">
                    Upload a profile picture
                  </label>
                  <label className="block mt-2">
                    <span className="sr-only">Choose profile photo</span>
                    <input
                      onChange={e=>setPhoto(e.target.files[0])}
                      type="file"
                      id='image'
                      className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-indigo-600
      hover:file:bg-violet-100
    "
                    />
                  </label>
                </div>
                <div className="mt-8 flex flex-col gap-y-4">
                  <button type="submit" onClick={handleSubmit} className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out bg-indigo-500 text-white text-lg font-bold py-3 rounded-xl">
                    Sign Up
                  </button>
                  <ToastContainer/>
                </div>
                <div className="mt-8 flex justify-center items-center">
                  <p className="font-medium text-base ">
                    Already have an account?
                  </p>
                  <Link
                    href="/login"
                    className="text-indigo-600 text-base font-medium ml-2"
                  >
                    Log in
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="bg-gray-200 hidden lg:flex h-full justify-center items-center w-1/2  relative">
          <div className="w-60 h-60 bg-gradient-to-tr from-indigo-600 to-indigo-400 rounded-full  animate-spin"></div>
          <div className="w-full h-1/2 bg-white/10 backdrop-blur-lg absolute bottom-0"></div>
        </div>
      </div>
    )
}