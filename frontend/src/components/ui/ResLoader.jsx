import React, { useContext } from 'react'
import {Puff,Hourglass} from 'react-loader-spinner'
import { PiRobotFill } from "react-icons/pi";
import { ThemeContext, ThemeProvider } from '../../context/ThemeContext';


const PuffLoaderRL = () => {
  const {theme}=useContext(ThemeContext)
  return ( 
    <div className={`text-center w-full h-full flex flex-col justify-center items-center`}>
     <PiRobotFill className='text-[60px]'/>
    Your Agent is working ...
    <br />
       <Puff
            visible={true}
            height="50"
            width="50"
            color={theme==="dark"?"white":"black"}
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />

          {/* <Hourglass
            visible={true}
            height="30"
            width="30"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={theme==="dark"?"white":"white"}
            /> */}

    
    </div>
  )
}

export default PuffLoaderRL