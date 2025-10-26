import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext.jsx";
import HeroAnimation from "../HeroAnimation.jsx";

const Home = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`w-full min-h-screen flex flex-col items-center justify-center text-center transition-colors duration-400 ${
        theme === "light"
          ? "bg-gray-100 text-gray-900"
          : "bg-gray-900 text-gray-100"
      }`}
    >
    {/* <HeroAnimation/> */}
      <h1 className="text-4xl font-bold mb-4">Welcome to  
       <span className={` ${theme==="light"?'text-emerald-500':'text-emerald-300'} font-extrabold `}> ProxiVision</span>
      </h1>
      <p className="text-lg text-gray-500 max-w-2xl">
       Browser safely with ProxiVision, your trusted proxy solution for secure and private internet access.
      </p>
    </div>
  );
};

export default Home;
