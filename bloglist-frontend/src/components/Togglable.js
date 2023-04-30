import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div className=''>
      <div style={hideWhenVisible}>
        <button className='p-2 bg-gray-400 border-2 rounded-md' onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div className='p-2 bg-gray-400 border-2 rounded-md text-xl' style={showWhenVisible}>
        {props.children}
        <button className='bg-orange-400 border-2 rounded-md p-1' onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'
export default Togglable
