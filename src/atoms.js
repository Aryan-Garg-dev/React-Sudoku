import { atom } from 'recoil'

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
        invalidSquareForNumber: { r: null, c: null }, //(sqaure that can't hold the note for selected number)
        invalidNumberForSqaure: null, //(number that can't be noted on the sqaure)
        notes: {}, // (notes object of format R-C: [numbers])
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