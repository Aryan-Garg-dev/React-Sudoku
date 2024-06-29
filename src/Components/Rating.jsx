import Proptypes from 'prop-types'
import _ from 'lodash'
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa'
// import Label from './Label';


/**
 * Logic to remove star when highlight moves is called
 */


const Rating = ({rating, size}) => {
    const fullStarsCount = Math.trunc(rating);
    const halfStarsCount = rating - fullStarsCount > 0 ? 1 : 0;
  return (
    <div className='w-fit h-fit'>
        <div>
        {fullStarsCount == 0
            ? halfStarsCount > 0 
                ? <div className='flex'>
                    <div className='star'><FaStarHalfAlt size={size} /></div>
                    {_.times(4).map(index=>(
                        <div key={index} className='star'><FaRegStar size={size} /></div>
                    ))}
                </div>
                : <div className='flex'>
                    {_.times(5).map(index=>(
                        <div key={index} className='star'><FaRegStar size={size} /></div>
                    ))}
                </div>
            : <div className='flex'>
                {_.times(fullStarsCount).map(index=>(
                    <div key={index} className='star'><FaStar size={size} /></div>
                ))}
                {_.times(halfStarsCount).map(index=>(
                    <div key={index+fullStarsCount} className='star'><FaStarHalfAlt size={size} /></div>
                ))}
                {_.times(5-fullStarsCount-halfStarsCount).map(index=>(
                    <div key={index+fullStarsCount+halfStarsCount} className='star'><FaRegStar size={size} /></div>
                ))}
            </div>
        }
        </div>
    </div>
  )
}

Rating.propTypes = {
    rating: Proptypes.number,
    size: Proptypes.number,
}

export default Rating
