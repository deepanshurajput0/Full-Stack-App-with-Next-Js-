"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
interface User{
    email:string,
    password:string
}

export default function Login() {
  const [user, setUsers] = useState<User>({
    email: "",
    password: "",
  });
  const { setUser } = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
 const handleInput=(e:ChangeEvent<HTMLInputElement>)=>{
     setUsers({
        ...user, [e.target.name]:e.target.value
     })
 }

async function handleSubmit(e:FormEvent<HTMLFormElement>){
    e.preventDefault()
    setLoading(true)
    try {
        const res = await fetch('http://localhost:3000/api/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(user)
        })
        const data = await res.json()
        if(res.ok){
            setUser(data?.user)
            router.push('/')
            alert(data.message)

            setLoading(false)
        }else{
            alert(data.message)
            setLoading(false)
        }
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
}

  return (
    <div className="hero bg-base-200 min-h-screen text-white">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left ml-56">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit}  className="card-body ">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                value={user.email}
                name="email"
                onChange={handleInput}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                value={user.password}
                name="password"
                onChange={handleInput}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                {
                    loading ? <span className="loading loading-spinner loading-xs"></span> : 'Login'
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
