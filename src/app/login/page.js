"use client";
import { useRouter,useSearchParams } from "next/navigation";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "@/Contexts/UserContext";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const router=useRouter();
  const searchParams=useSearchParams();
  const {setIsLoggedIn,user,login}=useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    if (email.length > 0 && password.length > 0) {
    
     try{
        const res= await fetch('/api/login',{
            headers:{
              "content-type":"application/json",
            },
            method:'POST',
            body:JSON.stringify({
                email,
                password
            }),
        });
          if(res.ok){
            router.push('/');
            setIsLoggedIn(true);
          }else{
            toast.error('res bad');
          }
          

     }catch(err){

     }
      
    } else {
      toast.error("Fill the fileds!");
    }
  };
  return (
    <div className="flex h-screen w-full">
      <div className="w-full flex items-center justify-center lg:w-1/2 ">
        <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-100">
          <h1 className="text-5xl font-semibold">Welcome Back!</h1>
          <p className="font-medium text-lg text-gray-500 mt-4">
            Please enter your details
          </p>
          <div className="mt-8 ">
            <form>
              <div>
                <label className="text-lg font-medium">Email</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Enter your emil"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="text-lg font-medium">Password</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-8 flex flex-col gap-y-4">
                <button
                  onClick={handleSubmit}
                  className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out bg-indigo-500 text-white text-lg font-bold py-3 rounded-xl"
                >
                  Sign in
                </button>
                <ToastContainer />
              </div>
              <div className="mt-8 flex justify-center items-center">
                <p className="font-medium text-base ">Don't have an account?</p>
                <Link
                  href="register"
                  className="text-indigo-600 text-base font-medium ml-2"
                >
                  Sign up
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
  );
}
