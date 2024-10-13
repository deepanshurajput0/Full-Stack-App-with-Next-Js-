'use client'

import Link from "next/link";

export default function Navbar(){
  async function Logout(){
    try {
       const res = await fetch('http://localhost:3000/api/logout')
       const data = await res.json()
        if(res.ok){
          alert(data.message)
        }
    } catch (error) {
      console.log(error)
    }
  }
    return(
        <div className="navbar bg-base-100 text-white">
  <div className="flex-1">
    <Link href={'/'} className="btn btn-ghost text-xl">Todo</Link>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li>
        <Link href={'/create'} >Create</Link>
      </li>
      <li>
        <Link href={'/todos'} > Todos </Link>
      </li>
    </ul>
    <button className="btn" onClick={Logout} >Logout</button>
  </div>
</div>
    )
}