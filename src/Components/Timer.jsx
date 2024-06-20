import { useState, useEffect } from 'react';
// import Proptypes from 'prop-types'
import { FaPlay, FaPause } from 'react-icons/fa'
import { VscDebugRestart } from "react-icons/vsc";

/**
 * @todo 
 * timer should also be stored in game state
 * time limit will be passed 
 * Progress will be seperate component (may be circular with star in them)
 * integrate timer with game state
 * on reset, reset the everything except data,
 */

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const formatTime = (time) => {
    const getSeconds = (time % 60).toString().padStart(2, '0');
    const getMinutes = Math.floor(time / 60).toString().padStart(2, '0');
    const getHours = Math.floor(time / 3600).toString().padStart(2, '0');
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  const calculateWidth = () => {
    const percentage = (time / 60) * 100;
    return `${Math.floor(percentage)}%`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-4xl font-mono">{formatTime(time)}</div>
      <div className="mt-4">
        { !isRunning 
        ? <button
            className="px-4 py-2 m-2 text-white bg-green-500 rounded hover:bg-green-600"
            onClick={() => setIsRunning(true)}
          >
            <FaPlay />
          </button>
        : <button
            className="px-4 py-2 m-2 text-white bg-red-500 rounded hover:bg-red-600"
            onClick={() => setIsRunning(false)}
          >
            <FaPause />
          </button>
        }
        <button
          className="px-4 py-2 m-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={() => { setTime(0); }}
        >
          <VscDebugRestart />
        </button>
      </div>
      {/* Progress Bar */}
      <div className='w-24 mt-4'>
        <div className='h-3 w-full bg-gray-100 rounded-full'>
        <div
            className='h-3 bg-slate-800 rounded-full'
            style={{ width : calculateWidth() }} 
          >          
          </div>
        </div>
      </div>
    </div>
  );
};


export default Timer;