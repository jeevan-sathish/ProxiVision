import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { MdLightMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

const NavThemeBtn = () => {
    const {theme,toggleTheme} =useContext(ThemeContext)
  return (
    <div>
         <button
        className={`w-[30px] h-[30px] m-2.5 flex justify-center items-center
                    ${theme==="light"?'text-black':'text-white'} 
                      rounded-full transition scale-115 text-[30px] animate-spin`}
        onClick={toggleTheme}
      >
         {theme === "light" ? <MdLightMode/> : <MdOutlineLightMode/>} 
      </button>
    </div>
  )
}

export default NavThemeBtn