import { useRecoilState } from "recoil"
import { gameStateAtom } from "../atoms"
// import { useEffect } from "react";

const difficultyOptions = {
    'easy': 'rookie',
    'medium': 'standard',
    'hard': 'master',
    'expert': 'legend'
}

const Difficulty = () => {
    const [game, setGame] = useRecoilState(gameStateAtom);


  return (
    <div className="w-fit h-fit relative group">
        <label className="font-playwrite text-xs font-semibold text-[#6C3428] cursor-default">Difficulty</label>
        <div className='relative min-w-40 mt-1'>
            <div className="w-full min-w-32 p-1 px-4 rounded-xl mb-1.5 border-[3px]
             border-red-800 text-[#973131] bg-[#F5E7B2] font-roadrage text-xl text-center shadow-sm shadow-[#ED9455] cursor-auto select-none" >
                {difficultyOptions[game.selectedDifficulty] || 'Challenge'}</div>
            <div className="absolute rounded-sm hidden group-hover:flex flex-col border-[3px] border-red-800 text-[#973131] text-xl font-arcade bg-[#F5E7B2] p-2 px-4 w-full cursor-pointer select-none z-10 shadow-inner shadow-[#ED9455]">
                {Object.keys(difficultyOptions).map(key=>{
                    if (!game.selectedDifficulty || key != game.selectedDifficulty){
                        return <div 
                            className="option" 
                            key={key}
                            onClick={()=>setGame({
                                ...game,
                                selectedDifficulty: key
                            })}
                        >{difficultyOptions[key]}</div>
                    }
                })}
                {game.selectedDifficulty && (
                    <div 
                        className="option"
                        onClick={()=>{
                            if (game.selectedDifficulty){
                                setGame({
                                    ...game,
                                    selectedDifficulty: "",
                                })
                            }
                        }}
                    >Challenge</div>
                )}
            </div>
        </div>
    </div>
  )
}

export default Difficulty
