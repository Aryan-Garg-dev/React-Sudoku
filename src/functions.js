import { getSudoku } from "sudoku-gen";
import _ from 'lodash';

/**
 * The function `createNewGame` generates a new Sudoku game with a specified difficulty level.
 * @param [difficulty=medium] - The `difficulty` parameter in the `createNewGame` function is used to
 * specify the level of difficulty for the Sudoku puzzle. It has a default value of 'medium', but you
 * can also pass 'easy' or 'hard' as arguments to generate puzzles of different difficulty levels.
 * @returns The `createNewGame` function returns an object with three properties: `data`, `board`, and
 * `solution`. The `data` property contains the puzzle data fetched using the `getSudoku` function, the
 * `board` property contains the puzzle in a 2D array format, and the `solution` property contains the
 * solution to the puzzle in a 2D array format.
 */
export const createNewGame = (difficulty = 'medium')=>{
    const puzzleData = getSudoku(difficulty);
    const puzzle = _.chunk(Array.from(puzzleData.puzzle).map(num => Number(num)), 9);
    const solution = _.chunk(Array.from(puzzleData.solution).map(num => Number(num)), 9);
    return { data: puzzleData, board: puzzle, solution }
}

/**
 * The `formatTime` function takes a time value in seconds and returns it formatted as
 * hours:minutes:seconds.
 * @param time - The `formatTime` function takes a time value in seconds and converts it into a
 * formatted string in the format "HH:MM:SS".
 * @returns The `formatTime` function returns a formatted time string in the format "HH:MM:SS" where HH
 * represents hours, MM represents minutes, and SS represents seconds.
 */
export const formatTime = (time) => {
    const getSeconds = (time % 60).toString().padStart(2, '0');
    const getMinutes = Math.floor(time / 60).toString().padStart(2, '0');
    const getHours = Math.floor(time / 3600).toString().padStart(2, '0');
    return `${getHours}:${getMinutes}:${getSeconds}`;
};

/**
 * The function `roundOffRating` rounds a given rating to the nearest half value.
 * @param rating - The `roundOffRating` function takes a `rating` as input and rounds it off to the
 * nearest half value. The function first extracts the whole number part of the rating using
 * `Math.trunc()`, then calculates the decimal part to determine whether to round up to the next half
 * or not.
 * @returns The function `roundOffRating` takes a `rating` as input and returns a rounded off version
 * of the rating.
 */
const roundOffRating = (rating)=>{
    const wholeNumber = Math.trunc(rating);
    const decimalNumber = (rating - wholeNumber > 0) 
        ? (rating - wholeNumber > 0.5) 
            ? 1 
            : 0.5
        : 0;
    return wholeNumber + decimalNumber ;
}

/**
 * The function `calculateGameRating` calculates a game rating based on time taken, time limit, error
 * count, and error limit.
 * @param timeTaken - The `timeTaken` parameter represents the time taken by a player to complete a
 * game.
 * @param timeLimit - The `timeLimit` parameter represents the maximum time needed to complete a game.
 * @param errorCount - The `errorCount` parameter represents the number of errors made by the player
 * during the game.
 * @param errorLimit - The `errorLimit` parameter represents the maximum number of errors allowed in
 * the game. If the `errorCount` exceeds this limit, the game rating will be set to 0.
 * @returns The function `calculateGameRating` returns the calculated game rating after considering the
 * time taken, time limit, error count, and error limit.
 */
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

/**
 * The `initializeNotes` function creates an empty object representing notes for a 9x9 grid.
 * @returns An object is being returned with keys in the format `R-C` where each key has
 * an empty array as its value.
 */
export const initializeNotes = () => {
    const notes = {};
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        notes[`${r}-${c}`] = [];
      }
    }
    return notes;
  };