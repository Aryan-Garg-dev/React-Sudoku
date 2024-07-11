import Proptypes from 'prop-types'

const Mobile = ({children, className}) => {
  return (
    <div className={`max-sm:border max-sm:border-slate-200 max-sm:rounded-lg max-sm:justify-center max-sm:h-full max-sm:flex max-sm:items-center max-sm:pb-1 max-sm:shadow-inner max-sm:shadow-yellow-500 ${className} `}>
      {children}
    </div>
  )
}

Mobile.propTypes = {
    children: Proptypes.oneOfType([
        Proptypes.node, Proptypes.element, Proptypes.elementType
    ]),
    className: Proptypes.string
}

export default Mobile
