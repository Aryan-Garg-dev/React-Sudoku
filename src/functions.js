import { getSudoku } from "sudoku-gen";
import _ from 'lodash';

export const createNewGame = (difficulty = 'medium')=>{
    const puzzleData = getSudoku(difficulty);
    const puzzle = _.chunk(Array.from(puzzleData.puzzle).map(num => Number(num)), 9);
    const solution = _.chunk(Array.from(puzzleData.solution).map(num => Number(num)), 9);
    return { data: puzzleData, board: puzzle, solution }
}

export const formatTime = (time) => {
    const getSeconds = (time % 60).toString().padStart(2, '0');
    const getMinutes = Math.floor(time / 60).toString().padStart(2, '0');
    const getHours = Math.floor(time / 3600).toString().padStart(2, '0');
    return `${getHours}:${getMinutes}:${getSeconds}`;
};

const roundOffRating = (rating)=>{
    const wholeNumber = Math.trunc(rating);
    const decimalNumber = (rating - wholeNumber > 0) 
        ? (rating - wholeNumber > 0.5) 
            ? 1 
            : 0.5
        : 0;
    return wholeNumber + decimalNumber ;
}

export const calculateGameRating = (timeTaken, timeLimit, errorCount, errorLimit)=>{
    const timeLeft = timeLimit - timeTaken;
    if (errorCount >= errorLimit) return 0;
    const rating = ((timeLeft > 0 ? timeLeft : 0) / timeLimit) * 2 + ((errorLimit - errorCount) / errorLimit) * 2 + 1;
    return roundOffRating(rating); 
}

export const calculatePlayerRating = (currentRating, totalGamesPlayed, thisGameRating)=>{
    const rating = (currentRating * (totalGamesPlayed - 1) + thisGameRating) / totalGamesPlayed;
    if (totalGamesPlayed == 0) return 0;
    return roundOffRating(rating);
}

export const initializeNotes = () => {
    const notes = {};
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        notes[`${r}-${c}`] = [];
      }
    }
    return notes;
  };