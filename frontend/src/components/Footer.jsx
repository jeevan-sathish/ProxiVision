import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

const Footer = () => {
    const {theme}=useContext(ThemeContext)
  return (
    <div className={`w-full h-40 bg-black flex flex-col justify-center items-center ${theme==="light"?'text-white':'text-white'}`}>
        @copyrights all reserved
    </div>
  )
}

export default Footer