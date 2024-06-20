import Proptypes from 'prop-types'
import { useState } from 'react'

export const Toggle = ({onClick, text, checked}) => {
    const [isChecked, setIsChecked] = useState(checked);
  return (
    <div onClick={()=>{
        onClick()
        setIsChecked(!isChecked);
    }}>
      <label className="inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" checked={isChecked} />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-al peer-checked:bg-blue-600">
        </div>
        <span className="ms-3 text-sm font-medium text-gray-900">{text}</span>
    </label>
    </div>
  )
}

Toggle.propTypes = {
    onClick: Proptypes.func,
    text: Proptypes.string,
    checked: Proptypes.bool
}


