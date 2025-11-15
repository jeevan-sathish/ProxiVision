import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { LineWave } from 'react-loader-spinner'
import { GrRefresh } from "react-icons/gr";

const SensorAnalysis = () => {
  const { theme } = useContext(ThemeContext)
  const [val, setVal] = useState([])

  useEffect(() => {
  const fetchData = () => {
    fetch("http://localhost:5000/data")
      .then((res) => res.text())
      .then((text) => {
        const match = text.match(/(\d+)/);
        if (match) {
          const value = Number(match[1]);

          setVal((prev) => {
           
            if (prev[prev.length - 1] === value) return prev;

            const updated = [...prev, value];

            if (updated.length > 50) {
              return updated.slice(updated.length - 50);
            }

            return updated;
          });
        }
      })
      .catch((err) => console.error(err));
  };

  fetchData();
  const interval = setInterval(fetchData, 1000);
  return () => clearInterval(interval);
}, []);

function handleRefrehSensor(){
    setVal([])
}


  return (
    <div>
    
      <div
        className={`w-full p-6 h-[600px] overflow-y-scroll border-b border-gray-400 rounded-bl-4xl rounded-br-4xl 
        ${theme === "dark" ? "text-white bg-gray-900" : "text-black bg-gray-100"}`}
        style={{ scrollbarWidth: "none" }}
      >
      <button className='w-20 h-10 bg-green-400 rounded-2xl' onClick={handleRefrehSensor}>
       refresh
      </button>

        <table
          className={`mt-6 w-full border border-gray-500 border-collapse 
          ${theme === "dark" ? "text-white" : "text-black"}`}
        >
          <thead
            className={`${theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200 text-black"}`}
          >
            <tr>
              <th className="border border-gray-500 px-4 py-2">Value</th>
              <th className="border border-gray-500 px-4 py-2">Value in cm</th>
              <th className="border border-gray-500 px-4 py-2">Value in m</th>
              <th className="border border-gray-500 px-4 py-2">Your Distance</th>
            </tr>
          </thead>

          <tbody>
            {val.length > 0 ? (
              val.map((ele, i) => (
                <tr
                  key={i}
                  className={`${ele < 35
                    ? "bg-red-500 text-white"
                    : theme === "dark"
                      ? "bg-gray-800 text-white"
                      : "bg-white text-black"
                    }`}
                >
                  <td className="px-4 py-2">{ele}</td>
                  <td className="px-4 py-2">{ele} cm</td>
                  <td className="px-4 py-2">{(ele / 100).toFixed(2)} m</td>

                  <td className={`font-medium ${
                    ele < 35 ? "text-red-200" : "text-green-500"
                  }`}>
                    {ele < 35 ? "Too Close" : "Safe Distance"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className=" flex justify-center items-center"
                >
                  <LineWave
                    visible={true}
                    height="100"
                    width="100"
                    color="#4fa94d"
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SensorAnalysis
