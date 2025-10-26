import React, { useContext,useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import FallingLineSpinner from "./ui/FallingLineSpinner";

const HeroAnimation = () => {
    const { proxiValue, setProxiValue,theme} =useContext(ThemeContext)


  useEffect(() => {
      const fetchData = () => {
        fetch("http://localhost:5000/data")
          .then((res) => res.text())
          .then((text) => {
            const match = text.match(/(\d+)/); 
            if (match) {
              const value = Number(match[1]);
            //   setDistance((prev) => [...prev, value]);
              setProxiValue(value)
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
      className="min-w-[50%] h-[250px] flex flex-row justify-center items-center"
      style={{ gap: `${proxiValue/2}px` }}
    >
      {
        proxiValue>60?(
            <img
        src="normalview.png"
        alt="Normal view"
        
        height={200}
        className="h-[200px] w-[200px]"
      />
        ):(
            <img
        src="angryview.png"
        alt="Normal view"
        width={100}
        height={200}
        className="h-[200px]  w-[200px]"
      />

        )
      }
   {
    proxiValue>0?(
         <h1 className={`${theme==="light"?"text-amber-500":"text-amber-500"}  text-[30px] p-1.5 font-extrabold leading-4`}>
            {proxiValue}cm 
      <br />
      <span className={`${theme==="light"?"text-black text-[15px]":"text-white text-[15px]" } font-medium`}>from the computer screen</span>
      </h1>
    ):(
     <FallingLineSpinner/>
    )
   }
      <img
        src="system.png"
        alt="System view"
        width={100}
        height={200}
        className="h-[200px]"
      />
    </div>
  );
};

export default HeroAnimation;
