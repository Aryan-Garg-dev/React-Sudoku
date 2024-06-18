import { atom } from 'recoil'

export const puzzleAtom = atom({
    key: 'puzzleAtom',
    default: {
        puzzle: "",
        solution: "",
        difficulty: "easy",
    }
})

// export const selectedPiece = atom({

// })

export const selectedNumberAtom = atom({
    key: 'selectedNumberAtom',
    default: null
})