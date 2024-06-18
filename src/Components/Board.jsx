import _  from 'lodash'
import { getSudoku } from 'sudoku-gen'
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { puzzleAtom, selectedNumberAtom } from '../atoms';

const Board = () => {
    // const boardState = useRecoilValue(boardConfigAtom);
    const [sudoku, setSudoku] = useRecoilState(puzzleAtom);
    const [selected, setSelected] = useState([]);
    const [selectedNumber, setSelectedNumber] = useRecoilState(selectedNumberAtom)
    useEffect(()=>{
        if (!localStorage.getItem('game')){
            const game = getSudoku(sudoku.difficulty) 
            setSudoku(game);
            localStorage.setItem('game', JSON.stringify(game));
        } else {
            const game = JSON.parse(localStorage.getItem('game'));
            setSudoku(game);
        }
    }, [setSudoku, sudoku.difficulty])
    useEffect(()=>{
        if (sudoku.puzzle != '' && localStorage.getItem('game'))
            localStorage.setItem('game', JSON.stringify(sudoku))
    }, [sudoku]);
    useEffect(()=>{
        setSelected([]);
    }, [selectedNumber])
    useEffect(()=>{
        if (sudoku.puzzle == sudoku.solution && localStorage.getItem('game') && sudoku.puzzle != ''){
            const game = getSudoku(sudoku.difficulty) 
            setSudoku(game);
            localStorage.setItem('game', JSON.stringify(game));
        }
    }, [sudoku, setSudoku])
   return (
    <div className={`w-fit m-2 border-2 border-gray-700 flex flex-col`}>    
        {_.times(9, r => (
            <div className='flex' key={r}>
                {_.times(9, c=>(
                    <div 
                        className={`border flex justify-center items-center lg:h-12 lg:w-12 h-10 w-10 max-sm:h-9 max-sm:w-9
                                ${(c == 2 || c == 5) && 'border-r-2 border-r-gray-700'}
                                ${(r == 2 || r == 5) && 'border-b-2 border-b-gray-700'}
                                ${sudoku.puzzle[r*9+c] != '-' && 'bg-slate-100' }
                                ${sudoku.puzzle[r*9+c] == '-' && 'hover:bg-slate-200' }
                                ${selected.includes(r*9+c) && 'bg-red-400 hover:bg-red-400 border-red-300' }
                                lg:text-2xl text-xl
                            `} 
                        key={r*9+c} 
                        onClick={()=>{
                            if (selectedNumber && sudoku.puzzle[r*9+c]=='-'){
                                if (sudoku.solution[r*9+c] == selectedNumber){
                                    let updatedBoard = Array.from(sudoku.puzzle);
                                    updatedBoard[r*9+c] = selectedNumber;
                                    setSudoku({...sudoku, puzzle: updatedBoard.join("")})
                                } else {
                                    setSelected([...selected, r*9+c])
                                }
                            }
                        }}
                    >
                        {sudoku.puzzle[r*9+c] != '-' && sudoku.puzzle[r*9+c] }
                    </div>
                ))}
            </div>
        ))}
    </div>
  )
}

export default Board
