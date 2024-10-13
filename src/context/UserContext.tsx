'use client'

import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";


interface User {
    _id:string,
    name:string,
    email:string
}


interface UserContextType {
    user : User | null,
    setUser : React.Dispatch<React.SetStateAction<User | null>>;
    logout:()=>void;
}

const UserContext = createContext<UserContextType | undefined >(undefined)


export const useUser =()=>{
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context
}

export const UserProvider =({children}:{children:ReactNode}) =>{
    const [user, setUser] = useState<User | null>(null)
    useEffect(()=>{
        const getMe = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/me');
                const data = await res.json();
                setUser(data?.data || null);
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        };
        getMe();
    },[])
    const logout = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/logout');
            if (res.ok) {
                setUser(null); // Update the user state to null on logout
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
    return(
        <UserContext.Provider value={{user,setUser,logout}} >
           {children}
        </UserContext.Provider>
    )
}