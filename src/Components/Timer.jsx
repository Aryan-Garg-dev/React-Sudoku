import { useTimer } from 'react-timer-hook';
import Proptypes from 'prop-types'

MyTimer.propTypes = {
    expiryTimestamp: Proptypes.number
}

function MyTimer({ expiryTimestamp }) {
  const {
    // totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    // isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });


  return (
    <div style={{textAlign: 'center'}}>
      <div style={{fontSize: '25px'}}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <button onClick={start} className='p-2 border mx-1 rounded-lg border-slate-400'>Start</button>
      <button onClick={pause} className='p-2 border mx-1 rounded-lg border-slate-400'>Pause</button>
      <button onClick={resume} className='p-2 border mx-1 rounded-lg border-slate-400'>Resume</button>
      <button onClick={() => {
        // Restarts to 5 minutes timer
        const time = new Date();
        time.setSeconds(time.getSeconds() + 60);
        restart(time)
      }}  className='p-2 border mx-1 rounded-lg border-slate-400' >Restart</button>
    </div>
  );
}

export default function Timer() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 60); // 10 minutes timer
  return (
    <div>
      <MyTimer expiryTimestamp={time} />
    </div>
  );
}