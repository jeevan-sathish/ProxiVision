import React, { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext.jsx";
import HeroAnimation from "../HeroAnimation.jsx";
import Disclamer from "../Disclamer.jsx";



const Home = () => {
  const [disclamer, setDisclamer] = useState(false);
  const { theme } = useContext(ThemeContext);
  

  function handleDisclamer() {
    setDisclamer((prev) => !prev);
  }

  return (
    <div
      className={`relative w-full min-h-screen flex flex-col items-center justify-center text-center transition-colors duration-500 px-4 overflow-hidden ${
        theme === "light"
          ? "bg-gray-100 text-gray-900"
          : "bg-gray-900 text-gray-100"
      }`}
    >
     
      <div
        className={`w-full h-full flex flex-col items-center justify-center transition-all duration-300 ${
          disclamer ? "blur-md pointer-events-none" : ""
        }`}
      >
        <HeroAnimation />

        <h1 className="text-5xl sm:text-6xl font-extrabold mt-6 mb-4">
          Welcome to{" "}
          <span
            className={`${
              theme === "light" ? "text-emerald-500" : "text-emerald-300"
            }`}
          >
            ProxiVision
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mb-8">
          “ProxiVision helps you maintain a safe distance from your screen,
          protecting your eyes and promoting healthy vision every day.”
        </p>

        <button
          className="w-[200px] sm:w-[250px] h-[55px] rounded-full text-white font-semibold bg-emerald-500 hover:bg-emerald-600 transition-colors duration-300"
          onClick={handleDisclamer}
        >
          Let’s Go
        </button>
      </div>

     
      {disclamer && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/40 backdrop-blur-sm">
          <Disclamer close={handleDisclamer} />
        </div>
      )}
    </div>
  );
};

export default Home;
