"use client"
import { useAuth } from '@/hooks/useAuth'
import { useContext, useEffect } from 'react';
import UserContext from '@/Contexts/UserContext';
import Link from 'next/link';




export default function Home() {  
  const {isLoggedIn,setIsLoggedIn}=useContext(UserContext); 
  const auth=useAuth();
  const full_name=auth?.full_name;
  const email=auth?.email;
  const role=auth?.role;
  useEffect(()=>{
      if(auth){
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
  },[auth]);
  return (
      <>
      {isLoggedIn?(
        <div className='justify-center flex h-screen items-center'>
        <div>
          Hey! {full_name} welcome. Please visit your
          <Link href='/' className='text-indigo-500 text-lg font-bold ml-2'>profile page!</Link>

        </div>
      </div>
      ):(
        <div className='justify-center flex h-screen items-center'>
          <div>
            You are not logged in please 
            <Link href='/login' className='text-indigo-500 text-lg font-bold ml-2'>login!</Link>

          </div>
        </div>
      )}
      
      </>
  )
}

