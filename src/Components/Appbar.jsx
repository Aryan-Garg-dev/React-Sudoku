import { sudokuLogo } from "../../public"

const Appbar = () => {
  return (
    <div className="border-b shadow-md rounded-lg flex justify-between">
      <div className='flex items-center gap-2 m-2'> 
        <img src={sudokuLogo} className="h-[50px] w-[50px]" />
        <div className={`text-5xl font-zerovel select-none`}>Sudoku</div>
      </div>
    </div>
  )
}

export default Appbar
