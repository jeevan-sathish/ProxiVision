import React from 'react'
import { Link } from 'react-router-dom'

const NavLinks = () => {
  return (
    <div className='w-auto p-5 flex flex-row justify-center gap-[20px]'>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/test">Test</Link>
    </div>
  )
}

export default NavLinks