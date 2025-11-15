import React, { useContext, useState } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { DNA } from 'react-loader-spinner'
import { GoSidebarExpand } from "react-icons/go";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import AiResponceBlock from './AiResponceBlock'
import { RiBrain2Line } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { RiSpeakAiFill } from "react-icons/ri";
import { FaCirclePause } from "react-icons/fa6";
import { GrResume } from "react-icons/gr";
import { FaCircleStop } from "react-icons/fa6";
import { GoogleGenerativeAI } from "@google/generative-ai";
import TestResultBlock2 from './TestResultBlock2';


const TestResult = ({responce,handleBtnClick,setResponse}) => {
    const {theme} =useContext(ThemeContext)
   const [active,setActive]=useState("")
    const [collaps,setCollaps]=useState(false)
    const [loading,setLoading]=useState(true)
    const [summeryShow, setSummeryShow]=useState(false)
    const [summerizedData,setSummerizedData]=useState(" ")


    let synth = window.speechSynthesis;
let utterance = null;

 function speakText() {
  // If already speaking, stop first
  if (synth.speaking) {
    
    if(active ==="speak"){
         setActive(" ")
         synth.cancel()
    }
     
    
    };

  utterance = new SpeechSynthesisUtterance(summerizedData);

  utterance.rate = 1;
  utterance.pitch = 1;
  
  synth.speak(utterance);
  setActive("speak")
}

 function pauseSpeech() {
  if (synth.speaking && !synth.paused) {
    synth.pause();
      setActive("pause")
  }
}

 function resumeSpeech() {
  if (synth.paused) {
    synth.resume();
    setActive("resume")
  }
}
 function stopSpeech() {
  if (synth.speaking || synth.paused) {
    synth.cancel();
    setActive(" stop")
  }
}


    function handleCollaps(){
        setCollaps(prev=>!prev)
    }

    function handleClearResponce(){
      setResponse(" ")
    }

    const generateContent = async () => {
        const genAI = new GoogleGenerativeAI("AIzaSyCXdbwzRDDvi1wkiq3tgcLimcpwA4WSCfM");
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
        const prompt = `
          Based on this data or responce :
          ${responce}
    
          provide simple and quick summery  ,
           and point wise with highligts, like major threat,
            condition etc in 5 to 6 points or lines if posible provide in percentage also integer value.
        `;
    
        const result = await model.generateContent(prompt);
        setSummerizedData(result.response.text());
        setLoading(false)
      };

    function handleSummerize(){
      setSummeryShow(true)
      setLoading(true)
      generateContent()
      console.log(summerizedData)

    }

  return (
    <div
     className={` flex  flex-col mb-[30px]
      ${theme==="dark"?"bg-gray-800  text-white":"bg-white text-black"}
       w-full h-[780px] z-50 absolute top-15     shadow-2xl  transition-colors duration-300`}
    >
    <header 
                className={`w-full h-[50px]  sticky z-50 top-0 flex flex-row justify-between items-center p-7 
                ${theme==="dark"?"bg-gray-900  text-white":"bg-gray-800  text-black"}
                `}
                >
                {
                    responce.length>0? (<h1 className='text-[23px]'>Your AI Results Here</h1>):
                    ( <div className='flex flex-row text-center justify-center items-center gap-1.5'>
                    <h1 className='animate-pulse text-white'>Your Results are getting Analysed by our <span className='font-extrabold text-green-600'>AI</span> Doctor</h1> 

                     <DNA/> 
                     
                   
                    </div>
                    )
                }

                {
                  responce.length>0&&(
                     <div className='w-[500px] h-10 rounded-2xl bg-gray-800 flex flex-row justify-center items-center gap-[20px]'>
                        <p className='text-amber-500'>Tools :</p>
                     <button className='text-[30px] hover:text-red-500 ' onClick={handleClearResponce}>
                          {
                            responce.length>0?(<MdDelete/>):(<MdDeleteOutline/>)
                          }
                     </button>

                     <button className='hover:text-green-400' onClick={handleSummerize}>
                        <RiBrain2Line className='text-[30px] animate-pulse text-white hover:text-green-400' />
                     </button>

                      <button
                        className='text-white hover:text-green-600'
                        onClick={handleCollaps}
                        >
                        {!collaps? <TbLayoutSidebarLeftExpand className='text-[30px] text-white hover:text-green-600 '/>:<GoSidebarExpand className='text-[25px] text-white hover:text-green-600 '/>}
                      </button>

                      {/* speech */}
                      <div className='flex flex-row p-2 justify-center items-center gap-[25px] text-[25px]  rounded-[10px] border-l border-r border-amber-500'>

                      <button onClick={speakText} className={`${active ==="speak"?"text-blue-500":"text-white"}`}><RiSpeakAiFill/></button>
                      <button onClick={pauseSpeech} className={`${active ==="pause"?"text-blue-500":"text-white"}`}><FaCirclePause/></button>
                      <button onClick={resumeSpeech} className={`${active ==="resume"?"text-blue-500":"text-white"}`}><GrResume/></button>
                      <button onClick={stopSpeech} className={`${active ==="stop"?"text-blue-500":"text-white"}`}><FaCircleStop/></button>

                      </div>

                     </div>

                  )
               
                }
               
               


                <button 
                onClick={handleBtnClick}
                 className={`w-[100px] h-10 duration-300
                 ${theme==="dark"?"text-white":"text-black"} text-white rounded-[3px] border bg-black border-black hover:bg-red-800`}>
                 close
                 </button>
    </header>

  
    
  
<div className='w-full h-full flex flex-row overflow-hidden'>
<AiResponceBlock responce={responce} collaps={collaps}/>
{

 

 

 !collaps&&(
  <TestResultBlock2
   loading={loading} 
   summerizedData ={summerizedData} 
   setSummerizedData={setSummerizedData}
    summeryShow={summeryShow} 
      setSummeryShow={setSummeryShow}
    /> )
 
}
</div>
   


    </div>
  )
}

export default TestResult