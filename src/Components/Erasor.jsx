import { BsEraserFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { gameStateAtom } from "../atoms";

const Erasor = () => {
    const [game, setGame] = useRecoilState(gameStateAtom);
  return (
    <div className="cursor-pointer" 
        onClick={()=>setGame({
        ...game,
        erasorOn: !game.erasorOn,
        //TODO: Not completely sure on these below
        selectedNumber: null,
        selectedSquare: { r: null, c: null },
        selectedNumbersForSquare: [],
        selectedSquaresForNumber: [],
    })}>
        <div className={`p-1.5 border-2 border-[#254336] rounded-xl active:translate-y-0.5
         ${game.erasorOn ? 'shadow-none bg-[#43766C] text-white' : 'shadow-sm shadow-gray-800 text-[#254336]'}
        `}>
            <BsEraserFill size={18} />
        </div>
    </div>
  )
}

export default Erasor
