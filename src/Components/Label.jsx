import Proptypes from 'prop-types'

const Label = ({text}) => {
  return (
    <label className='font-playwrite text-xs font-semibold text-[#6C3428] select-none'>{text}</label>
  )
}

Label.propTypes = {
    text: Proptypes.string,
}

export default Label
