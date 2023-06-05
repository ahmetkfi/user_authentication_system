"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import UserContext from "@/Contexts/UserContext";
import Cookies from "universal-cookie";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";


export function Header() {
  const cookies = new Cookies();
  const logStat = cookies.get("isLoggedIn");
  const token = cookies.get("token") ?? null;
  console.log(typeof logStat);
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  useEffect(() => {
    if(logStat==='true'){
        setIsLoggedIn(true);
    }else{
      setIsLoggedIn(false);
    }
  }, [logStat]);

  const handleLogOut = () => {
    if (token) {
      cookies.remove("token");
      cookies.set("isLoggedIn", false);
      
    }
    
  };
  return (
    <nav className="flex items-center justify-between flex-wrap bg-indigo-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">AuthSys</span>
      </div>
      <div className="w-full block justify-end lg:flex lg:items-center lg:w-auto ">
        <div className="text-sm lg:flex-grow">
          <ul>
            {isLoggedIn ? (
              <>
                <Link href="/profile" className="text-white text-lg ml-2">
                  Profile
                </Link>

                <Link
                  href="/"
                  onClick={handleLogOut}
                  className="text-white text-lg ml-2"
                >
                  Logout
                </Link>
              </>
            ) : (
              <div></div>
            )}
          </ul>
        </div>
        <div></div>
        <ToastContainer></ToastContainer>
      </div>
    </nav>
  );
}

export default Header;

/*
 <>
               <Link href="/" className="text-white text-lg ml-2">
                  Profile
                </Link>

                <Link href="/" onClick={handleLogOut} className="text-white text-lg ml-2">
                  Logout
                </Link>
              </>
*/
