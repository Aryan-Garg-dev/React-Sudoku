import { useEffect } from "react";
import Appbar from "./Components/Appbar"
import Board from "./Components/Board"
// import Timer from "./Components/Timer"
import Numbers from "./Components/Numbers"
import { useRecoilState } from "recoil";
import { gameStateAtom } from "./atoms";
import Difficulty from "./Components/Difficulty";
import { createNewGame } from "./functions";
import _ from 'lodash'

function App() {

  const [ game, setGame ] = useRecoilState(gameStateAtom)

  useEffect(()=>{
    if (!localStorage.getItem('game')){
      const prevGameState = JSON.parse(localStorage.getItem('game'));
      setGame(prevGameState);
      console.log("game");
    } else {
      console.log("new");
      const { data, board, solution } = createNewGame(game.selectedDifficulty);
      setGame(game=>({
        ...game,
        isRunning: true,
        isOver: false,
        selectedNumber: null,
        selectedSquare: { r: null, c: null },
        disabledNumbers: [],
        board,
        data,
        solution,
      }))
    }
  }, [game.selectedDifficulty, setGame])

  useEffect(()=>{
    if (_.flattenDeep(game.board).join("") === game.data.solution) {
      setGame({
        ...game,
        isOver: true,
        isRunning: false,
      })
    }
  }, [setGame])
  
  return (
    <>
      <div className="h-screen w-full">
        <Appbar />
        <div className="grid grid-cols-2">
          <div>
            <Board />
            <Numbers />
          </div>
          <div>
            <Difficulty />
          </div>
        </div>
        {/* <Timer /> */}
      </div>
    </>
  )
}

export default App
