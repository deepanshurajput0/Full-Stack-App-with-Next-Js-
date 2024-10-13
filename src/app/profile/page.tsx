'use client'

import { useEffect, useState } from "react"

interface User {
    _id:string,
    name:string,
    email:string, 
}

export default function Profile(){
    const [user, setUser] = useState<User>()
     async function getMe (){
         try {
            const res = await fetch('http://localhost:3000/api/me')
            const data = await res.json()
            setUser(data?.data)
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



