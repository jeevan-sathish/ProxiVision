import React, { useContext, useState } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { DNA } from 'react-loader-spinner'
import { GoogleGenerativeAI } from "@google/generative-ai"
import AiResponceBlock from './AiResponceBlock'

const TestResult = ({userData,handleBtnClick}) => {
    const {theme} =useContext(ThemeContext)
    const [responce,setResponse]=useState("");


     const generateContent = async () => { 
        const genAI = new GoogleGenerativeAI("AIzaSyCXdbwzRDDvi1wkiq3tgcLimcpwA4WSCfM"); 
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); 
 
        const prompt = "10 questions axked by hr in interview"; 
        const result = await model.generateContent(prompt); 
        setResponse(result.response.text()); 
    };

  return (
    <div
     className={` flex  flex-col
      ${theme==="dark"?"bg-black  text-white":"bg-white text-black"}
       w-full h-full z-50 absolute top-0     shadow-2xl  transition-colors duration-300`}
    >
    <header 
                className={`w-full h-[50px]  sticky z-50 top-0 flex flex-row justify-between items-center p-7 
                ${theme==="dark"?"bg-gray-900  text-white":"bg-gray-400  text-black"}
                `}
                >
                {
                    responce.length>0? (<h1>Your AI Results Here</h1>):
                    ( <div className='flex flex-row text-center justify-center items-center gap-1.5'>
                    <h1 className='animate-pulse text-white'>Your Results are getting Analysed by our <span className='font-extrabold text-green-600'>AI</span> Doctor</h1> 

                    <DNA/>
                    </div>
                    )
                }
                <button 
                onClick={handleBtnClick}
                 className={`w-[100px] h-10 duration-300
                 ${theme==="dark"?"text-white":"text-black"} text-white rounded-[3px] border bg-black border-black hover:bg-red-800`}>close</button>
    </header>

    {/* <h1>
        {Object.keys(userData)}
    </h1>
    <button onClick={generateContent}>generate</button>
    <p>
        {responce}
    </p> */}

    <AiResponceBlock/>


    </div>
  )
}

export default TestResult