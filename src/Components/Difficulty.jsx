import { useRecoilState } from "recoil"
import { gameStateAtom } from "../atoms"
import Label from "./Label";
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
        <Label text={'Difficulty'} />
        <div className='relative min-w-40 mt-1'>
            <div className="w-full min-w-32 p-1 px-4 rounded-xl mb-1.5 border-[3px]
             border-red-800 text-[#973131] bg-[#F5E7B2] font-roadrage text-xl text-center shadow-sm shadow-gray-700 cursor-auto select-none" >
                {difficultyOptions[game.selectedDifficulty] || 'Challenge'}</div>
            <div className="absolute rounded-sm hidden group-hover:flex flex-col border-[3px] border-red-800 text-[#973131] text-xl font-arcade bg-[#F5E7B2] p-2 px-4 w-full cursor-pointer select-none z-10 shadow-inner shadow-red-950">
                {Object.keys(difficultyOptions).map(key=>{
                    if (key != game.selectedDifficulty){
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
                {game.selectedDifficulty != 'random' && (
                    <div 
                        className="option"
                        onClick={()=>{
                            if (game.selectedDifficulty){
                                setGame({
                                    ...game,
                                    selectedDifficulty: "random",
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
