import { useRecoilValue } from "recoil"
import { gameStateAtom } from "../../atoms"
import Rating from "../Rating"
import { formatTime } from "../../functions"
import { errorLimits } from "../../constants"
// import Errors from "../Errors"

const GameOver = () => {
  const game = useRecoilValue(gameStateAtom)
  return (
    <div className="absolute top-0 w-screen h-screen bg-slate-800 bg-opacity-20 flex justify-center items-center">
      <div className=" w-[500px] h-[500px] border-[6px] border-gray-900 shadow-md shadow-gray-600 bg-gray-100 rounded-xl flex flex-col items-center gap-2 pt-2">
        <div className="text-[80px] font-coffee text-gray-900">Game Over</div>
        <div className="mb-2"><Rating size={45} rating={game.rating} /></div>
        <div className="w-full flex flex-col items-center mt-4">
            <label className='font-playwrite text-2xl mr-10 mb-2 font-semibold text-[#6C3428] select-none'>{'Error :'}</label>
          <div className='flex gap-0.5'>
            <div className='inline text-4xl text-red-500 font-kghappy'>{game.errorCount}</div>
            <div className='inline text-4xl font-kghappy text-gray-800 '>{'/'}</div>
            <div className='inline text-4xl text-[#453F78]  font-kghappy'>{errorLimits[game.data.difficulty]}</div>
          </div>
        </div>
        <div className="w-full text-center">
          <div className="font-playwrite text-2xl font-semibold text-[#6C3428] select-none">Time Spent: </div>
          <div className="text-4xl mt-2 font-kghappy font-thin py-1 w-auto text-[#9B3922] flex justify-center items-center min-w-28 cursor-default select-none">{formatTime(game.timeSpentInSec)}</div>
        </div>
      </div>
    </div>
  )
}


{/**
  <div
      id="popup-modal"
      className={`fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-[calc(100%-1rem)] max-h-full ${
        showModal ? '' : 'hidden'
      }`}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={handleClose}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-4 md:p-5 text-center">
            <svg
              className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <button
              onClick={handleClose}
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            >
              Yes, I'm sure
            </button>
            <button
              onClick={handleClose}
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>   
*/}




export default GameOver
