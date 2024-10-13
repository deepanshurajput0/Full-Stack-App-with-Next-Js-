'use client'

import { useEffect } from "react"
import { useUser } from "@/context/UserContext"

export default function Profile(){
    const { setUser, user } = useUser()
     async function getMe (){
         try {
            const res = await fetch('http://localhost:3000/api/me')
            const data = await res.json()
            setUser(data.data)
         } catch (error) {
            console.log(error)
         }
    }
    useEffect(()=>{
       getMe()
    },[])
    return(
        <div className=" text-2xl ml-10 mt-24" > 
          <h1> Name -  {user?.name}</h1>
          <h2> Email - {user?.email}</h2>
        </div>
    )
}



