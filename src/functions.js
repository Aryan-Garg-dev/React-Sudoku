import { getSudoku } from "sudoku-gen";
import _ from 'lodash';

export const createNewGame = (difficulty = "")=>{
    const puzzleData = getSudoku(difficulty && difficulty);
    const puzzle = _.chunk(Array.from(puzzleData.puzzle).map(num => Number(num)), 9);
    const solution = _.chunk(Array.from(puzzleData.solution).map(num => Number(num)), 9);
    return { data: puzzleData, board: puzzle, solution }
}