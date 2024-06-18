import _  from 'lodash'
import { useRecoilState } from 'recoil';
import { gameStateAtom } from '../atoms';
import { useEffect } from 'react';

const Board = () => {
    const [ game, setGame ] = useRecoilState(gameStateAtom)

    useEffect(() => {
        if (game.board && game.board.length > 0)
        localStorage.setItem('game', JSON.stringify(game));
    }, [game]);

   return (
    <div className={`w-fit h-fit border-[6px] m-2 border-gray-900 rounded-lg`}>
        <div className={`w-fit border-2 border-gray-500  flex flex-col`}>    
            {_.times(9, r => (
                <div className='flex' key={r}>
                    {_.times(9, c=>(
                        <div className={` w-fit h-fit
                            ${(c == 2 || c == 5) && 'border-r-2 border-r-gray-700'}
                            ${(r == 2 || r == 5) && 'border-b-2 border-b-gray-700'}
                        `}
                        key={`${r}_${c}`}
                        >
                            <div 
                                className={`border border-gray-400 flex justify-center items-center lg:h-12 lg:w-12 h-10 w-10 max-sm:h-9 max-sm:w-9  cursor-pointer lg:text-xl text-lg text-gray-800 pt-1 font-playwrite font-medium
                                    ${ game.isRunning && game.board[r][c]   
                                        ? 'bg-slate-200 hover:bg-slate-200' 
                                        : (game.selectedSquare.r == r && game.selectedSquare.c == c) 
                                            ? 'bg-slate-100 border-[3px] border-[#344C64]'
                                            : game.selectedSquaresForNumber.find(square=>square.r == r && square.c == c)
                                                ? 'bg-red-200'
                                                :'hover:bg-slate-100'}
                                        `} 
                                        
                                        key={r*9+c} 
                                        onClick={()=>{
                                            if (!game.selectedNumber){
                                                if (game.selectedSquare.r != r || game.selectedSquare != c){
                                                    setGame({
                                                        ...game, 
                                                        selectedSquare: { r, c },
                                                        selectedNumbersForSquare: [],
                                                    });
                                                } else {
                                                    setGame({
                                                        ...game, 
                                                        selectedSquare: { r: null, c: null },
                                                        selectedNumbersForSquare: [],
                                                    });
                                                }  
                                            } else {
                                                if (game.solution[r][c]!=game.selectedNumber){
                                                    setGame({
                                                        ...game,
                                                        selectedSquaresForNumber: [...game.selectedSquaresForNumber, { r, c }],
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
                                        }}
                                        >
                                {game.isRunning && game.board[r][c] ? game.board[r][c] : ""}
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
