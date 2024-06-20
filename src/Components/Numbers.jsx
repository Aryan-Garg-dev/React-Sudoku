import _ from 'lodash';
import { useRecoilState } from 'recoil';
import { gameStateAtom } from '../atoms';

const Numbers = () => {
    const [game, setGame] = useRecoilState(gameStateAtom);
    
  return (
    <div className='flex w-fit gap-[4px] m-2'>
        {_.times(9, index=>(
            <div className={`shadow-sm
                rounded-lg flex justify-center items-center text-xl
                lg:text-2xl lg:h-11 lg:w-11 h-9 w-9 max-sm:h-8 max-sm:w-8 cursor-pointer 
                select-none
                ${game.selectedNumbersForSquare.includes(index+1)
                    ? 'border-2 bg-red-200 border-red-400'
                    : game.validNumbersForSquare.includes(index+1) && game.highlightMoves
                        ? 'bg-[#FFEEA9] border-2 border-[#FF7D29] shadow-md shadow-slate-600 active:translate-y-0.5 hover:bg-[#FFD966] text-red-950'
                        :  game.disabledNumbers.includes(index+1)
                            ? 'border-2 border-gray-300 bg-gray-200 shadow-none text-gray-600'
                            : game.selectedNumber == index+1
                                ? 'shadow-none border-2 bg-slate-700 border-slate-600 text-white active:translate-y-0.5'
                                :'border-2 shadow-slate-600 border-gray-500 hover:border-gray-600 hover:bg-slate-200 active:shadow-none'
                }
                `}
            
            key={index}
            onClick={()=>{
                if (game.selectedSquare.r != null && game.selectedSquare.c != null && !game.disabledNumbers.includes(index+1)){
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
                    if (!game.disabledNumbers.includes(index+1)){
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
