import _  from 'lodash'
import { useRecoilState } from 'recoil';
import { gameStateAtom } from '../atoms';
import { useCallback } from 'react';
/**
 * @todo
 * css logic of notes feature
 */

const Board = () => {
    const [ game, setGame ] = useRecoilState(gameStateAtom)

    const highlightRowColBox = useCallback((r, c)=>(
        (game.selectedSquare.r != null && game.selectedSquare.c != null) && (game.selectedSquare.r == r || game.selectedSquare.c == c || _.range(Math.floor(game.selectedSquare.r/3)*3, Math.floor(game.selectedSquare.r/3)*3+3).includes(r) && _.range(Math.floor(game.selectedSquare.c/3)*3, Math.floor(game.selectedSquare.c/3)*3+3).includes(c)) && game.highlightSquares
    ), [game.highlightSquares, game.selectedSquare.c, game.selectedSquare.r]);

    const highlightSelectedNumber = useCallback((r, c)=>(
        (game.selectedNumber === game.board[r][c]) && game.highlightSquares
    ), [game.highlightSquares, game.selectedNumber, game.board]);

    const highlightSelectedSqaure = useCallback((r, c)=>(
        (game.selectedSquare.r == r && game.selectedSquare.c == c)
    ), [game.selectedSquare.r, game.selectedSquare.c])

    const isWrongSqaureForSelectedNumber = useCallback((r, c)=>(
        game.selectedSquaresForNumber.length && game.selectedSquaresForNumber.find(square=>square.r == r && square.c == c)
    ), [game.selectedSquaresForNumber])

    const highlightValidMovesForNumber = useCallback((r, c)=>(
        game.validSquaresForNumber.find(square=>square.r == r && square.c == c) && game.highlightMoves
    ), [game.validSquaresForNumber, game.highlightMoves])

   return (
    <div 
    className={`relative w-fit h-fit border-[6px] m-2 mb-3 ${!game.isRunning 
        ? 'border-gray-700'
        : 'border-gray-900 shadow-md shadow-gray-500'} rounded-lg select-none`}
    >
        <div 
            className={`relative w-fit border-2 flex flex-col
                ${!game.isRunning
                    ? 'border-gray-400 '
                    : 'border-gray-500 '
                }    
            `}
        >    
            {_.times(9, r => (
                <div className='flex' key={r}>
                    {_.times(9, c=>(
                        <div className={`relative w-fit h-fit
                            ${(c == 2 || c == 5) && `border-r-2 ${game.isRunning ? 'border-r-gray-700' : 'border-r-gray-600'}`}
                            ${(r == 2 || r == 5) && `border-b-2 ${game.isRunning ? 'border-b-gray-700' : 'border-b-gray-600'}`}
                        `}
                        key={`${r}_${c}`}
                        >
                            <div 
                                className={`
                                    relative border flex justify-center items-center lg:h-12 lg:w-12 h-10 w-10 cursor-pointer lg:text-xl text-lg pt-1 font-playwrite font-medium border-gray-400
                                    ${game.isRunning || game.isOver
                                        ? (
                                            game.board.length && game.board[r][c]
                                                ? highlightSelectedNumber(r, c)
                                                    ? 'bg-[#95D2B3]'
                                                    : highlightRowColBox(r, c)
                                                        ?'bg-[#95D2B3]'
                                                        : 'bg-slate-200 hover:bg-slate-200 text-gray-800' 
                                                : highlightSelectedSqaure(r, c)
                                                    ? 'bg-slate-100 border-[4px] border-[#344C64] text-gray-800'
                                                    : highlightRowColBox(r, c)  
                                                        ? 'bg-[#D8EFD3]'        
                                                        : isWrongSqaureForSelectedNumber(r, c)
                                                            ? 'bg-red-200 text-gray-800'
                                                            : game.makeNotes && game.invalidSquareForNumber.r == r && game.invalidSquareForNumber.c == c
                                                                ? 'bg-red-100 text-gray-800'
                                                                :  highlightValidMovesForNumber(r, c)
                                                                    ? 'bg-[#FEFFD2] border-1 border-orange-300'
                                                                    : 'hover:bg-slate-100 text-gray-800 hover:border-2 hover:border-gray-400 bg-white'
                                            
                                            )
                                        : 'hover:bg-slate-100 bg-yellow-50'
                                    }
                                `} 
                                        
                                key={r*9+c} 
                                onClick={()=>{
                                    if (game.isRunning){
                                        // When number is not selected and sqaure is being selected, 
                                        // if it is an empty sqaure, it will be selected,
                                        // else prev selected sqaure will be unselected if any
                                        if (!game.selectedNumber){
                                        // erasor logic
                                            if (game.erasorOn){
                                                const key = `${r}-${c}`;
                                                if (game.notes[key] && game.notes[key].length){
                                                    const newNotes = _.cloneDeep(game.notes);
                                                    newNotes[key] = [];
                                                    setGame(game=>({
                                                        ...game,
                                                        notes: newNotes,
                                                    }))
                                                }
                                            }
                                            else {
                                                if ((game.selectedSquare.r != r || game.selectedSquare.c != c) && game.data.puzzle[r*9+c]=='-'){
                                                    setGame({
                                                    ...game, 
                                                    selectedSquare: { r, c },
                                                    selectedNumbersForSquare: [],
                                                    
                                                    // #notes
                                                    invalidNumberForSqaure: null,
                                                });
                                                } else {
                                                    setGame({
                                                        ...game, 
                                                        selectedSquare: { r: null, c: null },
                                                        selectedNumbersForSquare: [],
                                                        validNumbersForSquare: [],
                                                        
                                                        //#notes
                                                        invalidNumberForSqaure: null,
                                                    });
                                                }  
                                            }
                                        } else {
                                        // #notes
                                        // number is selected and sqaure is being selected for it
                                            if (game.makeNotes){
                                                if (!game.validSquaresForNumber.find(sqaure=>sqaure.r == r && sqaure.c == c)){
                                                    setGame(game=>({
                                                        ...game,
                                                        invalidSquareForNumber: { r, c },
                                                    }))
                                                } else {
                                                    const key = `${r}-${c}`;
                                                    // logic for 
                                                    // if selected number is already in notes then remove it from there
                                                    const newNotes = _.cloneDeep(game.notes);
                                                    if (game.notes[key] && game.notes[key].length && game.notes[key].includes(game.selectedNumber)){
                                                        const newNotesArrayForSqaure = _.cloneDeep(newNotes[key]);
                                                        newNotesArrayForSqaure.splice(newNotesArrayForSqaure.indexOf(game.selectedNumber), 1);
                                                        newNotes[key] = newNotesArrayForSqaure;
                                                        console.log('number already there', newNotes);
                                                        setGame({
                                                            ...game,
                                                            notes: newNotes,
                                                            invalidSquareForNumber: { r: null, c: null },
                                                        })
                                                // else append to the array
                                                    } else {
                                                        const newNotesArrayForSqaure = [];
                                                        if (!game.notes[key] || !game.notes[key].length) {
                                                            newNotesArrayForSqaure.push(game.selectedNumber);
                                                            console.log('new key');
                                                        } else {
                                                            newNotesArrayForSqaure.push(...game.notes[key], game.selectedNumber);
                                                            console.log('old key');
                                                        }
                                                        newNotes[key] = newNotesArrayForSqaure;
                                                        console.log('appending number to notes array', newNotes);
                                                        setGame({
                                                            ...game,
                                                            notes: newNotes,
                                                            invalidSquareForNumber: { r: null, c: null },
                                                        })
                                                    }
                                                }
                                            } else {
                                                if (!game.board[r][c]){
                                                    if (game.solution[r][c]!=game.selectedNumber){
                                                        setGame({
                                                            ...game,
                                                            selectedSquaresForNumber: [...game.selectedSquaresForNumber,    { r, c }],
                                                            errorCount: game.errorCount + 1
                                                        })
                                                    } else {
                                                        const newBoard = _.cloneDeep(game.board);
                                                        newBoard[r][c] = game.selectedNumber;
                                                        setGame({
                                                            ...game,
                                                            board: newBoard,
                                                        })
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                                >
                                {(game.isRunning || game.isOver) && game.board.length && game.board[r][c]
                                    ? game.board[r][c]
                                    : ''
                                }
                                {/* Template fot notes component */}
                                {game.notes && game.isRunning && game.board.length && !game.board[r][c] && <div className='absolute grid grid-cols-3 grid-rows-3 lg:text-[10px] text-[8px] lg:h-12 lg:w-12 h-10 w-10 mb-6 p-1.5 gap-2 text-gray-600'>
                                    {/* notes[r][c].map(num=>) */}
                                    {_.range(1, 10).map((num, index)=>{
                                        if (game.notes[`${r}-${c}`] && game.notes[`${r}-${c}`].length && game.notes[`${r}-${c}`].includes(num)){
                                            return <div key={index}>{num}</div>
                                        } else {
                                            return <div key={index}></div>
                                        }
                                    })}
                                </div>}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    </div>
  )
}

export default Board
