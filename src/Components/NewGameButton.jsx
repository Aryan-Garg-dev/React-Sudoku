import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { gameStateAtom } from "../atoms";
import { createNewGame, initializeNotes } from "../functions";
import { GameStartAudio } from "../../public";

const NewGameButton = () => {

    const [ game, setGame ] = useRecoilState(gameStateAtom)
    const NewGameAudio = new Audio(GameStartAudio);

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
    <div className="w-fit mt-1" onClick={()=>{
        NewGameAudio.play();
        generateNewGame(game.selectedDifficulty);
      }}>
        <div className="w-full min-w-40 py-1 px-5 rounded-xl border-[3px] border-[#254336] text-[#254336] bg-[#E8EFCF] font-roadrage text-xl max-sm:text-lg text-center shadow-sm shadow-gray-700 cursor-auto select-none active:translate-y-0.5">New Game</div>
    </div>
  )
}

export default NewGameButton
