import { useCallback, useEffect } from "react";
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

  const generateNewGame = useCallback(
    (difficulty) => {
      const { data, board, solution } = createNewGame(difficulty);
      const newGame = {
        ...game,
        isRunning: true,
        isOver: false,
        selectedNumber: null,
        selectedSquare: { r: null, c: null },
        selectedSquaresForNumber: [],
        // selectedDifficulty: difficulty,
        errorCount: 0,
        board,
        data,
        solution,
      };
      setGame(newGame);
      return newGame;
    },
    [setGame, game.selectedDifficulty]
  );

  useEffect(() => {
    const savedGame = JSON.parse(localStorage.getItem("game"));
    if (
      !savedGame ||
      !savedGame.board.length ||
      !savedGame.isRunning
    ) {
      const newGame = generateNewGame(game.selectedDifficulty);
      localStorage.setItem("game", JSON.stringify(newGame));
    } else {
      setGame(savedGame);
    }
  }, [setGame]);

  useEffect(() => {
    if (
        game.board.length 
        && game.solution.length 
        && _.flattenDeep(game.board).join("") === _.flattenDeep(game.solution).join("")
      ) {
      const newGame = {
        ...game,
        isOver: true,
        isRunning: false,
      };
      setGame(newGame);
      localStorage.setItem("game", JSON.stringify(newGame));
    }
  }, [game.board, game.solution, setGame]);

  useEffect(() => {
    if (game.selectedDifficulty && game.selectedDifficulty != game.data.difficulty ) {
      generateNewGame(game.selectedDifficulty);
    }
  }, [game.selectedDifficulty, generateNewGame]);

  useEffect(() => {
    if (game.isRunning && game.board.length)
    localStorage.setItem('game', JSON.stringify(game));
  }, [game]);

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
