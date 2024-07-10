import { useRecoilState } from "recoil"
import { gameStateAtom } from "../../atoms"
import { IoClose } from "react-icons/io5";
// import Errors from "../Errors"
import Proptypes from 'prop-types'
import { motion } from "framer-motion";
import { useCallback } from "react";
import { createNewGame, initializeNotes } from "../../functions";

const GameResume = ({ setClosed }) => {
  const [game, setGame] = useRecoilState(gameStateAtom)

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
    <div className="absolute top-0 w-full h-full min-h-screen flex justify-center items-center select-none backdrop-blur-sm">
      <motion.div 
        className="min-[820px]:w-[50%] w-[75%] h-[70vh]  max-sm:h-[60vh] max-sm:min-w-[350px] min-[820px]:h-[75%] max-h-[500px] bg-[#D6EFD8] border-2 border-[#80AF81] rounded-xl shadow-lg shadow-[#254336] flex flex-col items-center"
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: 1,
          scale: [0 , 1]
        }}
        transition={{
          duration: 0.5,
          ease: 'easeInOut'
        }}
      >
        <div className="flex w-full justify-center min-[820px]:justify-end pt-4 min-[820px]:pr-4">
          <div className="border-2 border-[#3C2A21] rounded-full shadow-sm shadow-gray-700 bg-[#E5E5CB] active:translate-y-0.5 active:shadow-none" onClick={()=>setClosed(true)}><IoClose size={30} color={'#1A120B'} /></div>
        </div>
        <div className="h-full flex flex-col items-center justify-center gap-10 pb-5">
          <div className="text-[#1A5319] text-4xl w-full px-16 text-center my-4 font-kghappy text-wrap">Welcome, back!!!</div>
          <div className="px-4 py-2 border-4 border-[#1A5319] text-4xl text-[#254336] rounded-xl font-roadrage bg-[#F1F8E8] shadow-md shadow-gray-700 active:translate-y-0.5 active:shadow-none"
          onClick={()=>{
            setGame(game=>({...game, isRunning: true}))
            setClosed(true);
          }}>Resume</div>
          <div className="px-4 py-2 border-4 border-[#1A5319] text-4xl text-[#254336] rounded-xl font-roadrage bg-[#F1F8E8] shadow-md shadow-gray-700 active:translate-y-0.5 active:shadow-none"
           onClick={()=>{
            generateNewGame(game.selectedDifficulty);
            setClosed(true);
          }}>New Game</div>
        </div>
      </motion.div>
    </div>
  )
}

GameResume.propTypes = {
  setClosed: Proptypes.func
}





export default GameResume
