import { BsEraserFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { gameStateAtom } from "../atoms";

const Erasor = () => {
    const [game, setGame] = useRecoilState(gameStateAtom);
  return (
    <div className="cursor-pointer" 
        onClick={()=>{
          setGame({
          ...game,
          erasorOn: !game.erasorOn,
          //TODO: Not completely sure on these below
          selectedNumber: null,
          selectedSquare: { r: null, c: null },
          selectedNumbersForSquare: [],
          validNumbersForSquare: [],
          selectedSquaresForNumber: [],
          validSquaresForNumber: [],
        })}}>
        <div className={`relative peer p-1.5 border-2 border-[#254336] rounded-xl active:translate-y-0.5
         ${game.erasorOn ? 'shadow-none bg-[#43766C] text-white' : 'shadow-sm shadow-gray-800 text-[#254336]'}
        `}>
            <BsEraserFill className="sm:h-[17px] sm:w-[17px]" />
        </div>
        <div className="absolute hidden peer-hover:sm:block px-1.5 py-1 rounded border-2 shadow-sm shadow-gray-400 mt-1.5 border-[#254336] bg-[#E7F0DC] font-playwrite text-xs font-semibold text-[#254336]">Erasor</div>
    </div>
  )
}

export default Erasor
