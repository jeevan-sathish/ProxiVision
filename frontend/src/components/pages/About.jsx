import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const About = () => {
  const { theme } = useContext(ThemeContext);
  const [val, setVal] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:5000/data")
        .then((res) => res.text())
        .then((text) => {
          const match = text.match(/(\d+)/);
          if (match) {
            const value = Number(match[1]);
           setVal((prev) => {
  if (prev[prev.length - 1] === value) return prev; // ignore duplicate
  return [...prev, value];
});
          }
        })
        .catch((err) => console.error(err));
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`w-full min-h-screen flex flex-col items-center justify-center text-center transition-colors duration-400 ${
        theme === "light"
          ? "bg-gray-100 text-gray-900"
          : "bg-gray-900 text-gray-100"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">About</h1>

      <div className="w-[250px] h-[300px] overflow-scroll">
        
      <table border={1}   className="mt-6 border border-gray-500 border-collapse">
        <thead>
          <tr>
            <th className="border border-gray-500 px-4 py-2">Value</th>
            <th className="border border-gray-500 px-4 py-2">Value in cm</th>
            <th className="border border-gray-500 px-4 py-2">Value in m</th>
          </tr>
        </thead>

        <tbody>
          {val.map((ele, i) => (
            <tr key={i} className={`${ele>35?" bg-green-300":"bg-red-300"}`}>
              <td className="px-4 py-2">{ele}</td>
              <td className="px-4 py-2">{ele * 1} cm</td>
              <td className="px-4 py-2">{(ele / 100).toFixed(2)} m</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

    </div>
  );
};

export default About;
