import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'

const Test = () => {
  const {theme}=useContext(ThemeContext)
  return (
    <div
    className={`w-full min-h-screen flex flex-col items-center justify-center text-center transition-colors duration-400 ${
        theme === "light"
          ? "bg-gray-100 text-gray-900"
          : "bg-gray-900 text-gray-100"
      }`}
    >Test</div>
  )
}

export default Test