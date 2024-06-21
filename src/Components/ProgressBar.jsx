// import React from 'react'
import { useRecoilValue } from "recoil";
import { timeLimit } from "../constants";
import { gameStateAtom } from "../atoms";

const ProgressBar = () => {
  const game = useRecoilValue(gameStateAtom);

  const calculateWidth = () => {
    const percentage = (game.timeSpentInSec / timeLimit[game.data.difficulty]) * 100;
    return `${percentage < 100 ? Math.floor(percentage) : 100}%`;
  };

  return (
    <div className='h-3 w-full bg-[#F5E7B2] rounded-full flex items-center'>
      <div
        className='h-3 bg-[#9B3922] rounded-full'
        style={{ width : calculateWidth() }} 
        >          
      </div>
    </div>
  )
}

export default ProgressBar
