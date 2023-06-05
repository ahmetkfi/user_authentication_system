"use client"
import { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserContextProvider({children}){
    const [user,setUser]=useState(null);
    const [isLoggedIn,setIsLoggedIn]=useState(false);
    const login=(userdata)=>{

        setUser(userdata);
    }
    const logout=()=>{

        setUser(null);
    }
    return(
        <UserContext.Provider value={{isLoggedIn,setIsLoggedIn,user,login,logout}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;




