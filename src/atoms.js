import { atom } from 'recoil'
// import { createNewGame } from './functions'

// const { data, board, solution } = createNewGame();

// const { data, board, solution } = JSON.parse(localStorage.getItem('game'));

export const gameStateAtom = atom({
    key: 'gameStateAtom',
    default: {
        data: {
            puzzle: "",
            solution: "",
            difficulty: ""
        },
        // data,
        board: [], // [[],[],[]]
        // board,
        solution: [], // [[],[],[]] 
        // solution,
        selectedDifficulty: "", // (random: "" || easy || medium || hard || expert)
        isRunning: false, // (true || false)
        isOver: false,  // (true || false)
        rating: 0,
        errorCount: 0, // (errors)

        selectedNumber: null, // (1-9)
        selectedSquaresForNumber: [], // (wrong sqaures selected in board to fill this number with)

        selectedSquare: { r: null, c: null }, // (square selected in board to be filled)
        selectedNumbersForSquare: [], // (wrong numbers selected to fill in that square)

        disabledNumbers: [], // (numbers that can't be filled anymore)

        player: {
            rating: 0, //player rating
        }
    }
})