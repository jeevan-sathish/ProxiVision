import React, { useState,useEffect } from 'react'

const useArudinoData = () => {
    const [arduinoData,setArduinoData]=useState()

  useEffect(() => {
      const fetchData = () => {
        fetch("http://localhost:5000/data")
          .then((res) => res.text())
          .then((text) => {
            const match = text.match(/(\d+)/);
            if (match) {
              const value = Number(match[1]);
             setArduinoData(value);
            }
          })
          .catch((err) => console.error(err));
      };
  
      fetchData();
      const interval = setInterval(fetchData, 1000);
      return () => clearInterval(interval);
    }, []);

  return {
            arduinoData
  }
}

export default useArudinoData