import Proptypes from 'prop-types'

export const Toggle = ({onClick, text, checked}) => {

  return (
    <div>
      <label className="inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" checked={checked} onClick={onClick} />
        <div className="relative w-10 h-5 bg-[#E0A75E] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#F5E7B2] peer-checked:peer-focus:ring-[#F9D689] rounded-full peer peer-checked:after:translate-x-[20px] rtl:peer-checked:after:-translate-x-[20px] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white peer-checked:after:bg-gray-100 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-al peer-checked:bg-[#973131]">
        </div>
        <span className="ms-3 text-md font-medium text-[#76453B] peer-checked:text-[#E36414] font-arcade tracking-wider">{text}</span>
    </label>
    </div>
  )
}

Toggle.propTypes = {
    onClick: Proptypes.func,
    text: Proptypes.string,
    checked: Proptypes.bool
}


