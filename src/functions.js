import { getSudoku } from "sudoku-gen";
import _ from 'lodash';

export const createNewGame = (difficulty = "")=>{
    const puzzleData = getSudoku(difficulty && difficulty);
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


//Game Rating Logic
//Player Rating Logic