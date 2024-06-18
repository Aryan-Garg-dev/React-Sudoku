import { sudokuLogo } from "../../public"

const Appbar = () => {
  return (
    <div className="border-b shadow-md rounded-lg flex justify-between">
      <div className='flex items-center gap-3 m-2 ml-4'> 
        <img src={sudokuLogo} className="h-[50px] w-[50px]" />
        <div className={`text-5xl font-zerovel select-none text-gray-900`}>Sudoku</div>
      </div>
    </div>
  )
}

export default Appbar
