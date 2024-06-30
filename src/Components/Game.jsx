import { useRecoilValue } from "recoil"
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

const Game = () => {
  const game = useRecoilValue(gameStateAtom);
  return (
    <div>
       <div className="h-screen max-[820px]:h-full w-full bg-[#FEFFD2]">
        <Appbar />
        <motion.div
        initial = {{ opacity: 0 }}
        animate = {{ 
          opacity: 1,
          scale: [0.9, 1]
        }}
        transition={{
          duration: 1,
          ease: 'easeInOut'
        }}>
          <div className="max-[820px]:hidden min-[820px]:grid min-[820px]:grid-cols-2 mt-4">
            <div className="p-2 px-4 flex justify-center">
              <div className="flex flex-col items-center w-fit">
                <Board />
                <Numbers />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex flex-col gap-4 pt-2 first:mb-2 mt-2">
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
          <div className="hidden max-[820px]:flex w-full px-10 flex-col items-center py-1">
            <div className="w-fit flex flex-col gap-2">
            <div className="w-full flex justify-around items-center">
              <Rating rating={game.rating} size={36} />
              <Difficulty />
            </div>
            <div className="flex w-full justify-around">
              <Errors />
              <Timer />
            </div>
            <div className="w-fit flex flex-col items-center">
              <Board />
              <Numbers />
            </div>
            <div className="flex flex-col items-center gap-4">
              <Highlight />
              <NotesToggle />
              <NewGameButton />
            </div>
            </div>
          </div>
        </motion.div>
        {/* New Game Button */}
          {/* <Timer /> */}
          {/* {game.isOver && <GameOver />} */}
        </div>
    </div>
  )
}

export default Game
