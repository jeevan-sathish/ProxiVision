import React from "react";
import { ThemeContext } from "../context/ThemeContext.jsx";
import { MdLightMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import NavLinks from "./navigationLinks/NavLinks.jsx";


const Nav = () => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  return (
    <div
      className={`w-full h-16 flex items-center justify-between px-6 sticky top-0 z-50 ${
        theme === "light" ? "bg-white text-black" : "bg-black text-white"
      }`}
    >
   
      <div>
        <img
          src="webLogo.PNG"
          alt="ProxiVision"
          width={150}
          height={20}
          className="bg-white rounded-[30px]"
        />
      </div>
      <NavLinks/>

      
      <button
        className="w-[30px] h-[30px] m-2.5 flex justify-center items-center  bg-green-700 hover:bg-green-600 text-white rounded-full transition text-[30px]"
        onClick={toggleTheme}
      >
         {theme === "light" ? <MdLightMode/> : <MdOutlineLightMode/>} 
      </button>
    </div>
  );
};

export default Nav;
