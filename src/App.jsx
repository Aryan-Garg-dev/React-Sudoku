import { useEffect } from "react";
import Appbar from "./Components/Appbar"
import Board from "./Components/Board"
// import Timer from "./Components/Timer"
import Numbers from "./Components/Numbers"
import { getSudoku } from "sudoku-gen";
import { useRecoilState } from "recoil";
import { gameStateAtom } from "./atoms";
import _ from 'lodash'

function App() {

  const [ game, setGame ] = useRecoilState(gameStateAtom)

  useEffect(() => {
    const initializeGame = async () => {
      const prevGameState = JSON.parse(localStorage.getItem('game'));

      if (!prevGameState) {
        try {
          const newPuzzleData = await getSudoku(game.selectedDifficulty && gameStateAtom.selectedDifficulty);
          const puzzle = _.chunk(Array.from(newPuzzleData.puzzle).map(num => Number(num)), 9);
          const solution = _.chunk(Array.from(newPuzzleData.solution).map(num => Number(num)), 9);

          const newGameState = {
            ...game,
            data: newPuzzleData,
            isReady: true,
            board: puzzle,
            solution,
          };

          setGame(newGameState);
          localStorage.setItem('game', JSON.stringify(newGameState));
        } catch (error) {
          console.error('Error fetching Sudoku puzzle:', error);
        }
      } else {
        setGame(prevGameState);
      }
    };

    initializeGame();
  }, [game.selectedDifficulty, setGame]);
  
  return (
    <>
      <div className="h-screen w-full">
        <Appbar />
        <Board />
        <Numbers />
        {/* <Timer /> */}
      </div>
    </>
  )
}

export default App
