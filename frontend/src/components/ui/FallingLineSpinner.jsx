import React from 'react'
import {FallingLines} from 'react-loader-spinner'

const FallingLineSpinner = () => {
  return (
    <div className='mr-[30px]'>
       <FallingLines
  color="#4fa94d"
  width="100"
  visible={true}
  ariaLabel="falling-circles-loading"
  
  />

    </div>
 
  )
}

export default FallingLineSpinner