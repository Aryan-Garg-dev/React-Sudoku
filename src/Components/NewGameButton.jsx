import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { gameStateAtom } from "../atoms";
import { createNewGame, initializeNotes } from "../functions";

const NewGameButton = () => {

    const [ game, setGame ] = useRecoilState(gameStateAtom)

  // (Function to generate and set the new game state)
  const generateNewGame = useCallback(
    (difficulty) => {
      const { data, board, solution } = createNewGame(difficulty);
      const notes = initializeNotes();
      const newGame = {
        ...game,
        data,

        board,
        solution,

        isRunning: true,
        isOver: false,
        rating: 5,
        errorCount: 0,
        timeSpentInSec: 0,
        selectedDifficulty: difficulty,

        highlightMoves: false,
        calledHighlightMoves: false,

        // #notes
        makeNotes: false,
        invalidSquareForNumber: { r: null, c: null },
        invalidNumberForSqaure: null,
        notes,

        selectedNumber: null,
        selectedSquaresForNumber: [],
        validSquaresForNumber: [],

        selectedSquare: { r: null, c: null },
        selectedNumbersForSquare: [],
        validNumbersForSquare: [],

        disabledNumbers: [],

      };
      setGame(newGame);
      return newGame;
    },
    [setGame]
  );

  return (
    <div className="w-fit" onClick={()=>generateNewGame(game.selectedDifficulty)}>
        <div className="w-full min-w-32 p-1 px-4 rounded-xl mb-1.5 border-[3px] border-[#254336] text-[#254336] bg-[#E8EFCF] font-roadrage text-xl text-center shadow-sm shadow-gray-700 cursor-auto select-none active:translate-y-0.5">New Game</div>
    </div>
  )
}

export default NewGameButton
