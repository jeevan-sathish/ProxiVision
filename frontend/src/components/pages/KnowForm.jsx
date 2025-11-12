import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'

const KnowForm = () => {

    const {theme} =useContext(ThemeContext)



  return (
    <div
     className={`relative w-full min-h-screen flex flex-col items-center justify-center text-center transition-colors duration-500 px-4 overflow-hidden ${
        theme === "light"
          ? "bg-gray-100 text-gray-900"
          : "bg-gray-900 text-gray-100"
      }`}
    >
  
  
    
    </div>
  )
}

export default KnowForm