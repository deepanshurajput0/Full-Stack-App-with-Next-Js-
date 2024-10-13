import Link from "next/link";

export default function Navbar(){
    return(
        <div className="navbar bg-base-100 text-white">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">Todo</a>
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
  </div>
</div>
    )
}