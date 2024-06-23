import _ from 'lodash';
import { useRecoilState } from 'recoil';
import { gameStateAtom } from '../atoms';

const Numbers = () => {
    const [game, setGame] = useRecoilState(gameStateAtom);
    
  return (
    <div className='flex w-fit gap-[5px]'>
        {_.times(9, index=>(
            <div className={`shadow-sm
                rounded-lg flex justify-center items-center text-xl
                lg:text-2xl lg:h-11 lg:w-11 h-9 w-9 max-sm:h-8 max-sm:w-8 cursor-pointer 
                select-none
                ${game.isRunning && !game.erasorOn
                    ? (
                        game.selectedNumbersForSquare.includes(index+1)
                        ? 'border-2 bg-red-200 border-red-400'
                        : game.makeNotes && game.invalidNumberForSqaure == index + 1
                            ? 'border-2 bg-red-100 border-red-300'
                            : game.validNumbersForSquare.includes(index+1) && game.highlightMoves
                                ? 'bg-[#FFEEA9] border-2 border-[#FF7D29] shadow-md shadow-slate-600 active:translate-y-0.5 hover:bg-[#FFD966] text-red-950'
                                :  game.disabledNumbers.includes(index+1)
                                    ? 'border-2 border-gray-300 bg-gray-200 shadow-none text-gray-600'
                                    : game.selectedNumber == index+1
                                        ? 'shadow-none border-2 bg-slate-700 border-slate-600 text-white active:translate-y-0.5'
                                        :'border-2 shadow-slate-600 border-gray-500 hover:border-gray-600 hover:bg-slate-200 active:shadow-none'
                    )
                    : 'border-2 border-gray-300 bg-gray-200 shadow-none text-gray-600'
                }
                `}
            
            key={index}
            onClick={()=>{
                if (game.isRunning && !game.erasorOn)
                //When Empty Square is selected, Number has to be selected
                if (game.selectedSquare.r != null && game.selectedSquare.c != null && !game.disabledNumbers.includes(index+1)){
                    if (game.makeNotes){
                        if (!game.validNumbersForSquare.includes(index+1)){
                            setGame(game=>({
                                ...game,
                                invalidNumberForSqaure: index + 1,
                            }))
                        } else {
                           const { r, c } = game.selectedSquare;
                           const key = `${r}-${c}`;
                           const newNotes = _.cloneDeep(game.notes);
                           if (game.notes[key] && game.notes[key].length && game.notes[key].includes(index+1)){
                                const newNotesArrayForSqaure = _.cloneDeep(newNotes[key]);
                                newNotesArrayForSqaure.splice(newNotesArrayForSqaure.indexOf(index+1), 1);
                                newNotes[key] = newNotesArrayForSqaure;
                                setGame({
                                    ...game,
                                    notes: newNotes,
    
                                    invalidNumberForSqaure: null,
                                })
                            }  else {
                                const newNotesArrayForSqaure = [];
                                if (!game.notes[key] || !game.notes[key].length){
                                    newNotesArrayForSqaure.push(index+1);
                                } else {
                                    newNotesArrayForSqaure.push(...game.notes[key], index+1);
                                }
                                newNotes[key] = newNotesArrayForSqaure;
                                setGame({
                                    ...game,
                                    notes: newNotes,
    
                                    invalidNumberForSqaure: null,
                                })
                            }
                        }
                    } else {
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
                        }
                } else {
                    // When number is selected, another number is being selected or that number is being unselected
                    // if its a valid number it will be selected,
                    // else prev selected number will be unselected
                    if (!game.disabledNumbers.includes(index+1)){
                        if (game.selectedNumber != index + 1){
                            setGame({
                                ...game,
                                selectedNumber: index + 1,
                                selectedSquaresForNumber: [],

                                // #notes
                                invalidNumberForSqaure: null,
                            })
                        } else {
                            setGame({
                                ...game,
                                selectedNumber: null,
                                selectedSquaresForNumber: [],
                                validSquaresForNumber: [],

                                // #notes
                                invalidNumberForSqaure: null,
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
