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
        hasWon: false,
        rating: 5,
        errorCount: 0, // (errors)
        timeSpentInSec: 0,

        highlightSquares: true,
        highlightMoves: false,

        calledHighlightMoves: false,

        // #notes
        makeNotes: false,
        invalidSquareForNumber: { r: null, c: null },
        invalidNumberForSqaure: null,
        notes: {},
        erasorOn: false,

        selectedNumber: null, // (1-9)
        selectedSquaresForNumber: [], // (wrong squares selected in board to fill this number with)
        validSquaresForNumber: [],

        selectedSquare: { r: null, c: null }, // (square selected in board to be filled)
        selectedNumbersForSquare: [], // (wrong numbers selected to fill in that square)
        validNumbersForSquare: [],

        disabledNumbers: [], // (numbers that can't be filled anymore)

        // player: {
        //     rating: 1, //player rating
        //     totalGamesPlayed: 0,
        // }
    }
})