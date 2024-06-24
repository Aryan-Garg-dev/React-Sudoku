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
       <div className="h-screen w-full">
        <Appbar />
        <motion.div
        animate = {{ 
          opacity: [0.25, 1],
          scale: [0, 1],
        }}
        transition={{
          duration: 1,
          ease: 'easeInOut'
        }}>
          <div className="grid grid-cols-2">
            <div className="p-2">
              <div className="flex flex-col items-center w-fit">
                <Board />
                <Numbers />
              </div>
            </div>
            <div className="flex flex-col gap-4 pt-2 first:mb-2">
              <Rating rating={game.rating} size={30} />
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
        </motion.div>
        {/* New Game Button */}
          {/* <Timer /> */}
          {/* {game.isOver && <GameOver />} */}
        </div>
    </div>
  )
}

export default Game
