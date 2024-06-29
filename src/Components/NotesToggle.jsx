import { useRecoilState } from "recoil"
import { gameStateAtom } from "../atoms"
import { FaPen } from "react-icons/fa";
import { motion } from "framer-motion";

const NotesToggle = () => {
    const [game, setGame] = useRecoilState(gameStateAtom);
  return (
    <div>
        <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" checked={game.makeNotes} onChange={()=>{
                if (game.isRunning || !game.isOver){
                    setGame(game=>({
                        ...game,
                        makeNotes: !game.makeNotes,
                        
                        selectedNumbersForSquare: [],
                        selectedSquaresForNumber: [],
                        
                        invalidNumberForSqaure: null,
                        invalidSquareForNumber: { r: null, c: null },
                    }))
                }
            }} />
            <div className="relative w-[41px] h-[21px] bg-[#6B8A7A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-[20px] rtl:peer-checked:after:-translate-x-[20px] after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-[#E8EFCF] peer-checked:after:bg-[#DAD3BE]  after:rounded-full after:h-4 after:w-4 after:transition-al peer-checked:bg-[#254336]
            peer-hover:after:border-2 peer-hover:after:border-[#6B8A7A] peer-hover:peer-checked:after:border-[#254336] ">
            </div>
            <div className="ms-3 text-md font-medium text-[#43766C] peer-checked:text-[#254336] font-arcade tracking-wider select-none flex items-center gap-2">
                <div>Notes</div>
                {game.isRunning && !game.erasorOn
                    ?   <motion.div 
                            animate = {{
                                color: ['#254336', '#43766C', '#254336'],
                                scale: [0.75, 1.25, 0.75]
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                repeatType: "loop",
                                ease: 'easeInOut'
                            }}
                        >
                            <FaPen color={'#254336'} className={`${game.makeNotes ? 'visible' : 'invisible'} `} />
                        </motion.div>
                    :  <FaPen color={'#254336'} className={`${game.makeNotes ? 'visible' : 'invisible'} `} />
                }
            </div>
        </label>
    </div>
  )
}

export default NotesToggle
