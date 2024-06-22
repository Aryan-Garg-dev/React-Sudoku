import { useCallback } from 'react';
// import Proptypes from 'prop-types'
import { FaPlay, FaPause } from 'react-icons/fa'
import { VscDebugRestart } from "react-icons/vsc";
import { useRecoilState } from 'recoil';
import { gameStateAtom } from '../atoms';
import _ from 'lodash'
import { formatTime } from '../functions';
import ProgressBar from './ProgressBar';
import Label from './Label';

/**
 * @todo 
 * timer should also be stored in game state -> X
 * time limit will be passed 
 * Progress will be seperate component (may be circular with star in them) -> X
 * integrate timer with game state
 * on reset, reset the everything except data,
 */

const Timer = () => {
  const [game, setGame] = useRecoilState(gameStateAtom);

  const resetGame = useCallback(()=>{
    if (!game.isOver)
    setGame(game=>({
      ...game,

      board: _.chunk(Array.from(game.data.puzzle).map(num => Number(num)), 9),

      isRunning: true,
      rating: 5,
      errorCount: 0,
      timeSpentInSec: 0,

      highlightMoves: false,
      calledHiglightMoves: false,

      makeNotes: false,
      notes: _.chunk(Array.from(game.data.puzzle).map(num => Number(num)), 9),

      selectedNumber: null,
      selectedSquaresForNumber: [], 
      validSquaresForNumber: [],

      selectedSquare: { r: null, c: null },
      selectedNumbersForSquare: [],
      validNumbersForSquare: [],

      disabledNumbers: [],
    }))
  }, [setGame, game.isOver])

  return (
    <div className='w-fit'>
      <Label text={'Timer'} />
      <div className='flex gap-2 text-center w-fit mb-2'>
        <div className="text-xl font-kghappy font-thin py-1 w-auto text-[#9B3922] flex justify-center items-center min-w-28 cursor-default select-none">{formatTime(game.timeSpentInSec)}</div>
          <div className="flex justify-center items-center gap-2 py-1">
            <div className='relative'>
              { !game.isRunning 
                ? <button
                    className="peer w-fit h-fit p-2 text-[#6B240C] bg-[#F2ECBE] rounded hover:bg-green-600 hover:text-white outline-none"
                    onClick={() => { 
                      if (!game.isOver)
                      setGame({
                      ...game,
                      isRunning: true,
                    })
                    }}
                    >
                    <FaPlay size={12} />
                  </button>
                : <button
                  className="peer w-fit h-fit p-2 text-[#6B240C] bg-[#F2ECBE] rounded hover:bg-red-600 hover:text-white outline-none"
                  onClick={() => setGame({
                    ...game,
                    isRunning: false,
                  })}
                  >
                    <FaPause size={12} />
                  </button>
              }
              <label className='hidden absolute peer-hover:block px-1.5 py-1 rounded border-2 shadow-sm shadow-gray-400 mt-1 border-red-800 bg-[#F5E7B2] font-playwrite text-xs font-semibold text-[#6C3428]'>{game.isRunning ? 'Pause' : 'Resume'}</label>
            </div>
            <div className='relative'>
              <div className='peer flex justify-center items-center'>
                <button
                className="w-fit h-fit p-[5px] text-[#6B240C] bg-[#F2ECBE] rounded hover:bg-blue-600 hover:text-white outline-none"
                onClick={resetGame}
                >
                  <VscDebugRestart size={18} />
                </button>
              </div>
              <label className='hidden absolute peer-hover:block px-1.5 py-1 rounded border-2 shadow-sm shadow-gray-400 mt-1 border-red-800 bg-[#F5E7B2] font-playwrite text-xs font-semibold text-[#6C3428]'>Reset</label>
            </div>
          </div>
      </div>
      <div className='pl-1'>
        <ProgressBar />
      </div>
    </div>
  );
};


export default Timer;