import React from 'react'

function ScrollBtn(props) {
    const {children, additionalClass, onClick} = props
  return (
    <div className={`scrollBtn__container ${additionalClass || ""}`}><button type='button' onClick={onClick} className='scrollBtn__btn'>{children}</button></div>
  )
}

export default ScrollBtn