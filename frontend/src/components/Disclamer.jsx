import React, { useContext } from 'react';
import { CgDanger } from "react-icons/cg";
import { ThemeContext } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const Disclamer = ({ close }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`w-[500px] p-6 rounded-3xl shadow-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between transition-colors duration-300 ${
        theme === "light" ? 'bg-white text-gray-900' : 'bg-gray-800 text-white'
      }`}
    >
      <div className="flex items-start gap-4">
        <CgDanger className="text-4xl text-red-500 flex shrink-0" />
        <div>
          <h2 className="text-xl font-bold mb-2">Disclaimer</h2>
          <p className="text-sm">
            Please do not completely depend on our results. This is provided for your safety and general guidance. 
            It is always recommended to consult a professional doctor for accurate advice.
          </p>
        </div>
      </div>

      <div className="flex justify-end mt-4  flex-row gap-[15px]">
      <button  className="px-6 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors animate-pulse">
        <Link to='/Test'>Know me</Link>
      </button>
        <button
          onClick={close}
          className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Disclamer;
