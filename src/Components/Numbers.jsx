import _ from 'lodash';
import { useRecoilState } from 'recoil';
import { gameStateAtom } from '../atoms';
import { useCallback, useEffect } from 'react';

const Numbers = () => {
    const [game, setGame] = useRecoilState(gameStateAtom);

    const isDisabled = useCallback(query=>{
        const solution = _.flatten(game.solution);
        const board = _.flatten(game.board);
        return !solution.filter((num, index)=>num!=board[index]).includes(query)
    }, [game.board, game.solution])
    
    useEffect(()=>{
        const disabledNumbers = _.range(1, 9).filter(num=>isDisabled(num));
        if (disabledNumbers.length){
            setGame(game=>({
                ...game,
                disabledNumbers,
            }))
        }
    }, [isDisabled, setGame, game.board])

    useEffect(()=>{
        if (isDisabled(game.selectedNumber)){
            setGame(game=>({
                ...game,
                selectedNumber: null,
                selectedSquaresForNumber: [],
            }))
        }
    }, [isDisabled, setGame, game.selectedNumber]);

    useEffect(()=>{
        // [X] Sqaure Checks [X] line checks
        const r = game.selectedSquare.r;
        const c = game.selectedSquare.c;
        if (r != null && c != null){
            const validNumbers = _.range(1, 10);
            for (let i = 0; i < 3; i++){
                for (let j = 0; j < 3; j++){
                    const [ x, y ] = [ Math.floor(r/3)*3, Math.floor(c/3)*3 ];
                    if ((x+i != r || y+j != c) && game.board[x+i][y+j]){
                        const index = validNumbers.indexOf(game.board[x+i][y+j]);
                        validNumbers.splice(index, 1)
                    }
                }
            }
            
            for (let i = 0; i < 9; i++){
                if (validNumbers.includes(game.board[i][c])){
                    const index =validNumbers.indexOf(game.board[i][c])
                    validNumbers.splice(index, 1)
                }
            }

            for (let j = 0; j < 9; j++){
                if (validNumbers.includes(game.board[r][j])){
                    const index =validNumbers.indexOf(game.board[r][j])
                    validNumbers.splice(index, 1)
                }
            }

            setGame(game=>({
                ...game,
                validNumbersForSquare: validNumbers,
            }))
        }
    }, [game.board, game.selectedSquare, game.selectedSquare.c, game.selectedSquare.r, setGame])
    
  return (
    <div className='flex w-fit gap-[4px] m-2'>
        {_.times(9, index=>(
            <div className={`shadow-sm
                rounded-lg flex justify-center items-center text-xl
                lg:text-2xl lg:h-11 lg:w-11 h-9 w-9 max-sm:h-8 max-sm:w-8 cursor-pointer 
                select-none
                ${game.selectedNumbersForSquare.includes(index+1)
                    ? 'border-2 bg-red-200 border-red-400'
                    : game.validNumbersForSquare.includes(index+1) //highlightMoves
                        ? 'bg-[#FFEEA9] border-2 border-[#FF7D29] shadow-md shadow-slate-600 active:translate-y-0.5 hover:bg-[#FFD966] text-red-950'
                        :  isDisabled(index+1)
                            ? 'border-2 border-gray-300 bg-gray-200 shadow-none text-gray-600'
                            : game.selectedNumber == index+1
                                ? 'shadow-none border-2 bg-slate-700 border-slate-600 text-white active:translate-y-0.5'
                                :'border-2 shadow-slate-600 border-gray-500 hover:border-gray-600 hover:bg-slate-200 active:shadow-none'
                }
                `}
            
            key={index}
            onClick={()=>{
                if (game.selectedSquare.r != null && game.selectedSquare.c != null && !isDisabled(index+1)){
                    const { r, c } = game.selectedSquare;
                    if (index+1 == game.solution[r][c]){
                        const newBoard = _.cloneDeep(game.board);
                        newBoard[r][c] = index + 1;
                        setGame({ 
                            ...game, 
                            board: newBoard, 
                            selectedSquare: { r: null, c: null },
                            selectedNumbersForSquare: [],
                            validNumbersForSquare: [],
                        })
                    } else {
                        if (!game.selectedNumbersForSquare.includes(index+1) && !game.disabledNumbers.includes(index+1))
                        setGame({
                            ...game,
                            selectedNumbersForSquare: [...game.selectedNumbersForSquare, index+1],
                            errorCount: game.errorCount + 1
                        })
                    }
                } else {
                    if (!isDisabled(index+1)){
                        if (game.selectedNumber != index + 1){
                            setGame({
                                ...game,
                                selectedNumber: index + 1,
                                selectedSquaresForNumber: [],
                            })
                        } else {
                            setGame({
                                ...game,
                                selectedNumber: null,
                                selectedSquaresForNumber: []
                            })
                        }
                    }
                }
            }}
            >
                {index+1}
            </div>
        ))}
    </div>
  )
}


export default Numbers
