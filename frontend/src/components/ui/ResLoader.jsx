import React, { useContext } from 'react'
import {Puff} from 'react-loader-spinner'
import { PiRobotFill } from "react-icons/pi";
import { ThemeContext, ThemeProvider } from '../../context/ThemeContext';


const PuffLoaderRL = () => {
  const {theme}=useContext(ThemeContext)
  return ( 
    <div className={`text-center w-full h-full flex flex-col justify-center items-center`}>
     <PiRobotFill className='text-[60px]'/>
    Your Agent is working ...
       <Puff
      
visible={true}
height="50"
width="50"
color={theme==="dark"?"white":"black"}
ariaLabel="puff-loading"
wrapperStyle={{}}
wrapperClass=""
/>

    
    </div>
  )
}

export default PuffLoaderRL