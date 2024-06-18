import _ from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil'
import { puzzleAtom, selectedNumberAtom } from '../atoms';
import { useCallback } from 'react';
import { useState, useEffect } from 'react';

const Numbers = () => {
    const [selectedNumber, setSelectedNumber] = useRecoilState(selectedNumberAtom)
    const sudoku = useRecoilValue(puzzleAtom);
    const [ disabledNumbers, setDisabledNumbers ] = useState([])
    const isDisabled = useCallback(query=>{
        return !Array.from(sudoku.solution).map(num=>Number(num)).filter((num, index)=> num!=Array.from(sudoku.puzzle).map(num=>Number(num))[index]).includes(query);
    }, [sudoku.puzzle, sudoku.solution])
    useEffect(()=>{
        for (let i = 1; i <= 9; i++){
            if(isDisabled(i) && sudoku.puzzle && sudoku.solution && !disabledNumbers.includes(i)){ 
                setDisabledNumbers(disabledNumbers=>[...disabledNumbers, i])
                if (selectedNumber == i) setSelectedNumber(null)
            }
        }
    }, [isDisabled, disabledNumbers, sudoku.puzzle, sudoku.solution, selectedNumber, setSelectedNumber])
  return (
    <div className='flex'>
      {_.times(9, index=>(
        <div className={`border flex justify-center items-center text-lg lg:text-xl lg:h-12 lg:w-12 h-10 w-10 max-sm:h-9 max-sm:w-9 ${selectedNumber == index + 1 ? 'bg-slate-400' : 'hover:bg-slate-200 bg-gray-50'} ${disabledNumbers.includes(index+1) && 'bg-red-200 hover:bg-red-200'} `}
        onClick={()=>{
            if (selectedNumber != index+1 && !disabledNumbers.includes(index+1)){
                setSelectedNumber(index+1);
            } else {
                setSelectedNumber(null);
            }
        }}
        key={index}
        
        >
            {index+1}
        </div>
      ))}
    </div>
  )
}


export default Numbers
