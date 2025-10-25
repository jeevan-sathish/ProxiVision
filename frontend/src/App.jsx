import React, { useContext } from "react";
import Nav from "./components/Nav";
import { ThemeContext } from "./context/ThemeContext.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home.jsx";
import About from "./components/pages/About.jsx";
import Test from "./components/pages/Test.jsx";

const App = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`w-full min-h-screen flex flex-col text-center transition-colors duration-400 ${
        theme === "light"
          ? "bg-gray-100 text-gray-900"
          : "bg-gray-900 text-gray-100"
      }`}
    >
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/test" element={<Test />} /> 
      </Routes>
     
    </div>
  );
};

export default App;
