import Appbar from "./Appbar"
import Board from "./Board"
import Difficulty from "./Difficulty"
import Highlight from "./Highlight"
import Numbers from "./Numbers"

const Game = () => {
  return (
    <div>
       <div className="h-screen w-full">
        <Appbar />
        <div className="grid grid-cols-2">
          <div>
            <Board />
            <Numbers />
          </div>
          <div className="flex flex-col gap-3">
            <Difficulty />
            <Highlight />
          </div>
        </div>
        {/* <Timer /> */}
        {/* {game.isOver && <GameOver />} */}
      </div>
    </div>
  )
}

export default Game
