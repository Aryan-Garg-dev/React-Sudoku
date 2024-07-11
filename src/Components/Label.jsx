import Proptypes from 'prop-types'

const Label = ({text}) => {
  return (
    <div className='max-sm:w-full max-sm:text-center max-sm:rounded-md max-sm:bg-yellow-200'>
      <label className='font-playwrite text-xs max-sm:text-[12px] font-semibold text-[#6C3428] select-none'>{text}</label>
    </div>
  )
}

Label.propTypes = {
    text: Proptypes.string,
}

export default Label
