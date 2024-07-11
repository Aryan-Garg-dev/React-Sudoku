import { useRecoilValue } from "recoil"
import { useState } from 'react'
import Appbar from "./Appbar"
import Board from "./Board"
import Difficulty from "./Difficulty"
import Errors from "./Errors"
import Highlight from "./Highlight"
import Numbers from "./Numbers"
import Rating from "./Rating"
import Timer from './Timer'
import { gameStateAtom } from "../atoms"
import NotesToggle from "./NotesToggle"
import Erasor from "./Erasor"
import { motion } from "framer-motion"
import NewGameButton from "./NewGameButton"
import GameResume from './Modals/GameResume';
import Mobile from './wrapper/Mobile';

const Game = () => {
  const game = useRecoilValue(gameStateAtom);
  const [resumeGameClosed, setResumeGameClosed] = useState(game.isRunning);
  return (
    <div className="relative">
       <div className="h-full w-full min-h-screen bg-[#FEFFD2]">
        <Appbar />
        <motion.div
        initial = {{ opacity: 0 }}
        animate = {{ 
          opacity: 1,
          scale: [0.9, 1]
        }}
        className="flex flex-col items-center"
        transition={{
          duration: 1,
          ease: 'easeInOut'
        }}>

          {/* Large Screen Layout */}
          <div className="max-[820px]:hidden grid grid-cols-2 mt-4 max-w-[1400px]">
            <div className="p-2 px-4 flex justify-center">
              <div className="flex flex-col items-center w-fit">
                <Board />
                <Numbers />
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="flex flex-col gap-4 pt-2 first:mb-2 mt-2 border-4 border-[#FFD18E] rounded-xl p-4 shadow-lg bg-[#FFF2D7]">
                <Rating rating={game.rating} size={32} />
                <Timer />
                <Difficulty />
                <Highlight />
                <div className="flex gap-4 items-center">
                  <NotesToggle />
                  <div className="mb-1"><Erasor /></div>
                </div>
                <Errors />
                <NewGameButton />
              </div>
            </div>
          </div>

          {/* Small Screen Layout */}
          <div className="hidden max-[820px]:flex w-full px-10 flex-col items-center py-1 mb-2">
            <div className="w-fit flex flex-col gap-2">
              <div className="w-full flex max-sm:flex-col justify-around items-center">
                <Rating rating={game.rating} size={36} />
                <div className="flex items-center gap-2">
                  <Difficulty />
                  <div className="max-sm:block hidden"><NewGameButton /></div>
                </div>
              </div>
              <div className="flex w-full h-fit justify-around items-center">
                <Mobile><Errors /></Mobile>
                <Mobile><Timer /></Mobile>
              </div>
              <div className="w-fit flex flex-col items-center">
                <Board />
                <Numbers />
              </div>
              <div className="flex flex-col items-center gap-4">
                <Mobile className={'max-sm:mt-2'}><Highlight /></Mobile>
                <NotesToggle />
                <div className="max-sm:hidden block"><NewGameButton /></div>
              </div>
            </div>
          </div>
        </motion.div>
        {/* New Game Button */}
          {/* <Timer /> */}
        </div>
        {!resumeGameClosed && <GameResume setClosed={setResumeGameClosed} />}
    </div>
  )
}


export default Game
