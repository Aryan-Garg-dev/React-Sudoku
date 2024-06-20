import { Toggle } from './Toggle'
import { gameStateAtom } from '../atoms'
import { useRecoilState } from 'recoil'

const Highlight = () => {
    const [game, setGame] = useRecoilState(gameStateAtom);
  return (
    <div className="w-fit">
        <label className="font-playwrite text-xs font-semibold text-[#6C3428]">Highlight</label>
        <div className="flex gap-3 mt-1">
            <Toggle text={'Sqaures'} checked={game.highlightSquares} onClick={()=>setGame(game=>({
                ...game,
                highlightSquares: !game.highlightSquares,
            }))} />
            <Toggle text={'Moves'} checked={game.highlightMoves} onClick={()=>setGame(game=>({
                ...game,
                highlightMoves: !game.highlightMoves,
            }))} />
        </div>
    </div>
  )
}

export default Highlight
