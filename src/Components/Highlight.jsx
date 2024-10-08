import { Toggle } from './Toggle'
import { gameStateAtom } from '../atoms'
import { useRecoilState } from 'recoil'
import Label from './Label';

const Highlight = () => {
    const [game, setGame] = useRecoilState(gameStateAtom);

  return (
    <div className="w-fit">
        <Label text={'Highlight'} />
        <div className="flex gap-3 mt-1 max-sm:px-2">
            <Toggle text={'Squares'} checked={game.highlightSquares} onClick={()=>{
                setGame(game=>({
                ...game,
                highlightSquares: !game.highlightSquares,
            }))}} />
            <Toggle text={'Moves'} checked={game.highlightMoves} onClick={()=>{
                setGame(game=>{
                if (game.calledHiglightMoves){
                    return {
                        ...game,
                        highlightMoves: !game.highlightMoves, 
                    }
                } else {
                    return {
                        ...game,
                        highlightMoves: !game.highlightMoves,
                        calledHighlightMoves: true,
                    }
                }
            })}} />
        </div>
    </div>
  )
}

export default Highlight
