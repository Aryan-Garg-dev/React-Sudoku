import { useRecoilValue } from 'recoil'
import { errorLimits } from '../constants'
import { gameStateAtom } from '../atoms'
import Label from './Label';

const Errors = () => {
    const game = useRecoilValue(gameStateAtom);
  return (
      <div className='select-none w-fit h-fit min-w-24 max-sm:min-h-[76px] max-sm:min-w-28'>
          <Label text={'Errors'} />
          <div className='flex gap-0.5 mt-2 max-sm:justify-center max-sm:items-center max-sm:px-1'>
            <div className='inline text-4xl  text-red-500 font-kghappy'>{game.errorCount}</div>
            <div className='inline text-4xl  font-kghappy text-gray-800 '>{'/'}</div>
            <div className='inline text-4xl  text-[#453F78]  font-kghappy'>{errorLimits[game.data.difficulty]}</div>
          </div>
      </div>
  )
}

export default Errors

/**
 * kghappy
 */