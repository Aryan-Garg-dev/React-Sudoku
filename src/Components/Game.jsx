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

const Game = () => {
  const game = useRecoilValue(gameStateAtom);
  return (
    <div>
       <div className="h-screen w-full">
        <Appbar />
        <div className="grid grid-cols-2">
          <div className="p-2">
            <div className="flex flex-col items-center w-fit">
              <Board />
              <Numbers />
            </div>
          </div>
          <div className="flex flex-col gap-4 pt-2 first:mb-2">
            <Rating rating={game.rating} />
            <Timer />
            <Difficulty />
            <Highlight />
            <div className="flex gap-4 items-center">
              <NotesToggle />
              <div className="mb-1"><Erasor /></div>
            </div>
            <Errors />
          </div>
        </div>
        {/* <Timer /> */}
        {/* {game.isOver && <GameOver />} */}
      </div>
    </div>
  )
}

export default Game
