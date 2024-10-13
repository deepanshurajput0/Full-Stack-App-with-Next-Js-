'use client'
import Link from "next/link";
import { useUser } from "@/context/UserContext";

export default function Navbar() {
  const { user, logout } = useUser(); // Access user and logout from context

  return (
    <div className="navbar bg-base-100 text-white">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          Todo
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {user ? (
            <>
              <li>
                <Link href="/create">Create</Link>
              </li>
              <li>
                <Link href="/todos">Todos</Link>
              </li>
              <button className="btn" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
