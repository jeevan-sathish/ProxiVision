import React from "react";
import { ThemeContext } from "../context/ThemeContext.jsx";

import NavLinks from "./navigationLinks/NavLinks.jsx";
import NavThemeBtn from "./navigationLinks/NavThemeBtn.jsx";


const Nav = () => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <div
      className={`w-full h-16 flex items-center justify-between px-6 sticky top-0 z-50 ${
        theme === "light" ? "bg-black text-white" : "bg-black text-white"
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

      <NavThemeBtn/>
     
    </div>
  );
};

export default Nav;
