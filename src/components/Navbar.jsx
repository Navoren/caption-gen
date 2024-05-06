import React from 'react'
import Link from "next/link";
function Navbar() {
  return (
    <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 gap-2">
        <Link href={'/pricing'}><li>Pricing</li></Link>
        <Link href={'/contact'}><li>Contact</li></Link>
      </ul>
    </div>
  </div>
  <div className="navbar-center">
    <Link href={'/'} className="font-semibold text-3xl">Caption <span className='text-yellow-300'>Banao</span></Link>
          </div>
          <div className='navbar-end'>
          </div>
</div>
  )
}

export default Navbar