import { Toggle } from './Toggle'
import { gameStateAtom } from '../atoms'
import { useRecoilState } from 'recoil'
import Label from './Label';
import { BoardPressAudio } from '../../public';

const Highlight = () => {
    const [game, setGame] = useRecoilState(gameStateAtom);
    const ClickAudio = new Audio(BoardPressAudio);
    ClickAudio.volume = 0.8;
  return (
    <div className="w-fit">
        <Label text={'Highlight'} />
        <div className="flex gap-3 mt-1">
            <Toggle text={'Sqaures'} checked={game.highlightSquares} onClick={()=>{
                ClickAudio.play();
                setGame(game=>({
                ...game,
                highlightSquares: !game.highlightSquares,
            }))}} />
            <Toggle text={'Moves'} checked={game.highlightMoves} onClick={()=>{
                ClickAudio.play();
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
