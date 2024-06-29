import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import { gameStateAtom } from "./atoms";
import { calculateGameRating, createNewGame, initializeNotes } from "./functions";
import _ from 'lodash'
import Game from "./Components/Game";
import { errorLimits, timeLimit } from "./constants";
import { GameLostAudio, GameStartAudio, GameWonAudio } from "../public";

function App() {

  const [ game, setGame ] = useRecoilState(gameStateAtom)
  const gameLostAudio = new Audio(GameLostAudio);
  const gameWonAudio = new Audio(GameWonAudio);

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
        hasWon: false,
        rating: 5,
        errorCount: 0,
        timeSpentInSec: 0,
        selectedDifficulty: difficulty,

        highlightMoves: false,
        calledHighlightMoves: false,

        // #notes
        makeNotes: false,
        invalidSquareForNumber: { r: null, c: null },
        invalidNumberForSquare: null,
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

  // (Initializing the Game)
  useEffect(() => {
    const savedGame = JSON.parse(localStorage.getItem("game"));
    if (
      !savedGame ||
      !savedGame.board.length ||
      savedGame.isOver
    ) {
      const newGame = generateNewGame("medium");
      localStorage.setItem("game", JSON.stringify(newGame));
      console.log(1.1)
      console.log(newGame);
    } else {
      setGame({
        ...savedGame,
        isRunning: true,
      });
      console.log(1.2)
      console.log(savedGame);
    }
  }, [setGame, generateNewGame]);

  //Game Over
  useEffect(() => {

    if ( game.board.length && game.solution.length )
    if (_.flattenDeep(game.board).join("") === _.flattenDeep(game.solution).join("") || game.errorCount >= errorLimits[game.data.difficulty]){
      const gameRating = calculateGameRating(game.timeSpentInSec, timeLimit[game.data.difficulty], game.errorCount, errorLimits[game.data.difficulty]) - (game.calledHighlightMoves ? 1 : 0);
      (game.errorCount >= errorLimits[game.data.difficulty]) ? gameLostAudio.play() : gameWonAudio.play();
      setGame(game=>({
        ...game,
        isOver: true,
        isRunning: false,
        hasWon:  !(game.errorCount >= errorLimits[game.data.difficulty]),
        rating: gameRating > 0 ? gameRating : 0,
      }));
      console.log(2)

    // Auto fill the last number
    } else if (game.disabledNumbers.length == 8){
      const gameRating = calculateGameRating(game.timeSpentInSec, timeLimit[game.data.difficulty], game.errorCount, errorLimits[game.data.difficulty]) - (game.calledHighlightMoves ? 1 : 0);
      gameWonAudio.play();
      setGame(game=>({
        ...game,
        board: game.solution,
        disabledNumbers: _.range(1, 10),
        isOver: true,
        hasWon: true,
        isRunning: false,
        rating: gameRating > 0 ? gameRating : 0,
      }))
      console.log(2.2);
    }
  }, [game.board, game.solution, setGame, game.errorCount, game.disabledNumbers, game.data.difficulty]);

  //Difficulty (Change in difficulty)
  useEffect(() => {
    if (game.selectedDifficulty && game.selectedDifficulty != game.data.difficulty && game.board.length) {
      console.log(game);
      new Audio(GameStartAudio).play();
      generateNewGame(game.selectedDifficulty);
      console.log(3)
    }
  }, [game.selectedDifficulty, generateNewGame, game.data.difficulty, game.board.length]);


//Numbers (function to check which number is completed on board)
  const isDisabled = useCallback(query=>{
    const solution = _.flatten(game.solution);
    const board = _.flatten(game.board);
    return !solution.filter((num, index)=>num!=board[index]).includes(query)
  }, [game.board, game.solution])
  
//Numbers (array of disabled numbers)
  useEffect(()=>{
    if (game.isRunning && game.board.length){
      const disabledNumbers = _.range(1, 10).filter(num=>isDisabled(num));
      if (disabledNumbers.length){
        setGame(game=>({
          ...game,
          disabledNumbers,
        }))
      }
      console.log(4)
    }
  }, [isDisabled, setGame, game.board, game.isRunning])

//Numbers (reset selected squares and selected number if it is disabled)
  useEffect(()=>{
      if (game.isRunning && isDisabled(game.selectedNumber) && game.board.length){
          setGame(game=>({
              ...game,
              selectedNumber: null,
              selectedSquaresForNumber: [],
          }))
          console.log(5)
      }
  }, [isDisabled, setGame, game.selectedNumber, game.isRunning, game.board.length]);

  const getValidNumbersForSquare = useCallback((r, c)=>{
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
      return validNumbers;
    } else {
      return [];
    }
  }, [game.board])

//Numbers (move hints for selected square)
  useEffect(()=>{
    if (game.isRunning && game.board.length){
      const r = game.selectedSquare.r;
      const c = game.selectedSquare.c;
      const validNumbers = getValidNumbersForSquare(r, c);
              
        setGame(game=>({
          ...game,
          validNumbersForSquare: validNumbers,
        }))
        console.log(6)
      }
  }, [game.selectedSquare, game.selectedSquare.c, game.selectedSquare.r, setGame, game.isRunning, getValidNumbersForSquare, game.board.length])

  //Board (valid squares for selected number)
  useEffect(()=>{
    if (game.isRunning && game.selectedNumber != null && game.board.length){
      let validSquaresForNumber = [];
      for (let r = 0; r < 3; r++){
        for (let c = 0; c < 3; c++){
          let validSquares = [];
          let validCols = [];
          let validRows = []
          let isBoxValid = true;
          for (let i = r*3; i < r*3+3; i++){
            for (let j = c*3; j < c*3+3; j++){
              validCols.push(j);
              validRows.push(i);
              validSquares.push({r: i, c: j});
              if (game.board[i][j] == game.selectedNumber){
                isBoxValid = false;
              }
            }
          }
          if (isBoxValid && validSquares){
            validCols = validCols.filter(c=>_.range(0, 9).every(r=>game.board[r][c]!=game.selectedNumber));
            validRows = validRows.filter(r=>_.range(0, 9).every(c=>game.board[r][c]!=game.selectedNumber));
            validSquaresForNumber = validSquaresForNumber.concat(validSquares.filter(square=>validCols.includes(square.c)&&validRows.includes(square.r)&&!game.board[square.r][square.c]));
          }
        }
      }
      setGame(game=>({
        ...game,
        validSquaresForNumber,
      }))
      console.log(7)
    }
  }, [game.isRunning, game.selectedNumber, game.board, setGame])

  useEffect(()=>{
    //TODO: Logic improvements required, :DONE
    // #notes (auto clear notes)
      // Logic to remove extra copies of selected number from row, col, or box if its already present in any of them
      if (game.isRunning && game.board.length && game.notes){

        const newNotes = _.cloneDeep(game.notes);
        for (let r = 0; r < 9; r++){
          for (let c = 0; c < 9; c++){
            const key = `${r}-${c}`;
            const validNumbersForSquare = getValidNumbersForSquare(r, c);
            if (game.notes[key] 
              && game.notes[key].length 
              && game.notes[key].find(num=>!validNumbersForSquare.includes(num))
            ){
              let newNotesArrayForSquare = _.cloneDeep(newNotes[key]);
              newNotesArrayForSquare = newNotesArrayForSquare.filter(num=>validNumbersForSquare.includes(num))
              newNotes[key] = newNotesArrayForSquare;
            }
          }
        }
        setGame(game=>({
          ...game,
          notes: newNotes,
        }))
        console.log('Notes changed Here!!!');
      }
    }, [game.validSquaresForNumber, setGame])
  
  //Timer
  useEffect(() => {
    let interval = null;
    if (game.isRunning && !game.isOver) {
      interval = setInterval(() => {
        setGame(game=>{
          const gameRating = calculateGameRating(game.timeSpentInSec, timeLimit[game.data.difficulty], game.errorCount, errorLimits[game.data.difficulty]) - (game.calledHighlightMoves ? 1 : 0);
          return {
          ...game,
          timeSpentInSec: game.timeSpentInSec + 1,
          rating:  gameRating > 0 ? gameRating : 0,
        }})
        console.log(8)
      }, 1000);
    } else if (!game.isRunning && game.isOver && game.timeSpentInSec !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [game.isRunning, game.timeSpentInSec, setGame, game.isOver]);

  // (storing game state after every state changes)
  useEffect(() => {
    if (game.board.length)
    localStorage.setItem('game', JSON.stringify(game));
  }, [game]);

  return (
    <>
      <Game />
    </>
  )
}

export default App
