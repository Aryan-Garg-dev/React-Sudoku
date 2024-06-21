// import React from 'react'

/**
 * Time should be passed throught state 
 * width should not go over 100
 */

const ProgressBar = () => {


  const calculateWidth = ({timeLimit}) => {
    const percentage = (time / timeLimit) * 100;
    return `${Math.floor(percentage)}%`;
  };

  return (
    <div className='w-24 mt-4'>
        <div className='h-3 w-full bg-gray-100 rounded-full'>
        <div
            className='h-3 bg-slate-800 rounded-full'
            style={{ width : calculateWidth() }} 
          >          
          </div>
    </div>
    </div>
  )
}

export default ProgressBar
