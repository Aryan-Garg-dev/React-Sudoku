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
import { Toggle } from "./Components/Toggle";

function App() {

  const [ game, setGame ] = useRecoilState(gameStateAtom)

  // (Function to generate and set the new game state)
  const generateNewGame = useCallback(
    (difficulty) => {
      const { data, board, solution } = createNewGame(difficulty);
      const newGame = {
        ...game,
        data,

        board,
        solution,

        isRunning: true,
        isOver: false,
        errorCount: 0,
        rating: 0,

        hightlightMoves: false,

        selectedNumber: null,
        selectedSquaresForNumber: [],

        selectedSquare: { r: null, c: null },
        selectedNumbersForSquare: [],
        validNumbersForSquare: [],

        disabledNumbers: [],

      };
      setGame(newGame);
      return newGame;
    },
    [setGame, game.selectedDifficulty]
  );

  // (Initializing the Game)
  useEffect(() => {
    const savedGame = JSON.parse(localStorage.getItem("game"));
    if (
      !savedGame ||
      !savedGame.board.length ||
      !savedGame.isRunning
    ) {
      const newGame = generateNewGame();
      localStorage.setItem("game", JSON.stringify(newGame));
    } else {
      setGame(savedGame);
    }
  }, [setGame]);

  //Game Over
  useEffect(() => {
    if (
        game.board.length 
        && game.solution.length 
        && _.flattenDeep(game.board).join("") === _.flattenDeep(game.solution).join("")
      ) {
      setGame(game=>({
        ...game,
        isOver: true,
        isRunning: false,
      }));
    }
  }, [game.board, game.solution, setGame]);

  //Difficulty (Change in difficulty)
  useEffect(() => {
    if (game.selectedDifficulty && game.selectedDifficulty != game.data.difficulty ) {
      generateNewGame(game.selectedDifficulty);
    }
  }, [game.selectedDifficulty, generateNewGame, game.data.difficulty]);


//Numbers (function to check which number is completed on board)
const isDisabled = useCallback(query=>{
  const solution = _.flatten(game.solution);
  const board = _.flatten(game.board);
  return !solution.filter((num, index)=>num!=board[index]).includes(query)
}, [game.board, game.solution])
  
//Numbers (array of disabled numbers)
useEffect(()=>{
    const disabledNumbers = _.range(1, 9).filter(num=>isDisabled(num));
    if (disabledNumbers.length){
        setGame(game=>({
            ...game,
            disabledNumbers,
        }))
    }
}, [isDisabled, setGame, game.board])

//Numbers (reseet selected squares and selected number if it is disabled)
useEffect(()=>{
    if (isDisabled(game.selectedNumber)){
        setGame(game=>({
            ...game,
            selectedNumber: null,
            selectedSquaresForNumber: [],
        }))
    }
}, [isDisabled, setGame, game.selectedNumber]);

//Numbers (move hints for selected square)
useEffect(()=>{
    const r = game.selectedSquare.r;
    const c = game.selectedSquare.c;
    if (r != null && c != null){
        const validNumbers = _.range(1, 10);
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                const [ x, y ] = [ Math.floor(r/3)*3, Math.floor(c/3)*3 ];
                if ((x+i != r || y+j != c) && game.board[x+i][y+j]){
                    const index = validNumbers.indexOf(game.board[x+i][y+j]);
                    validNumbers.splice(index, 1)
                }
            }
        }
        
        for (let i = 0; i < 9; i++){
            if (validNumbers.includes(game.board[i][c])){
                const index =validNumbers.indexOf(game.board[i][c])
                validNumbers.splice(index, 1)
            }
        }

        for (let j = 0; j < 9; j++){
            if (validNumbers.includes(game.board[r][j])){
                const index =validNumbers.indexOf(game.board[r][j])
                validNumbers.splice(index, 1)
            }
        }

        setGame(game=>({
            ...game,
            validNumbersForSquare: validNumbers,
        }))
    }
}, [game.board, game.selectedSquare, game.selectedSquare.c, game.selectedSquare.r, setGame])

// (storing game state after every state changes)
useEffect(() => {
  if (game.board.length && (game.isRunning || game.isOver))
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
          <div className="flex flex-col gap-4">
            <Difficulty />
            <Toggle text={'Moves'} />
          </div>
        </div>
        {/* <Timer /> */}
      </div>
    </>
  )
}

export default App
