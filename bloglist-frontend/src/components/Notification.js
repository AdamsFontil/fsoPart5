
const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }
  if (type === 'success') {
    console.log('successing')
    return (
      <div className='success'>

        {message}
      </div>
    )
  } if (type === 'error') {

    console.log('erroring')
    return (
      <div className='error'>
        {message}
      </div>
    )
  }
}


export default Notification
