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
        className='h-3 rounded-full bg-gradient-to-r from-[#C08B5C] from-30% via-[#795458] via-60% to-[#453F78] to-90% '
        style={{ width : calculateWidth() }} 
        >          
      </div>
    </div>
  )
}

export default ProgressBar
