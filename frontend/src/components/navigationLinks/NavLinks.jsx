import React from 'react'
import { Link } from 'react-router-dom'

const NavLinks = () => {
  return (
    <div className='w-auto p-5 flex flex-row justify-center item-center gap-[30px] '>
        <Link 
          to="/" 
          className='hover:text-amber-400 hover:font-medium hover:transition-colors duration-550'
        >
             Home
        </Link>

        <Link
           to="/about"
          className='hover:text-amber-400 hover:font-medium hover:transition-colors duration-550'
         >
            About
         </Link>

        {/* <Link 
            to="/test"
            className='hover:text-amber-400 hover:font-medium hover:transition-colors duration-550'
        >
            Test
        </Link> */}
    </div>
  )
}

export default NavLinks