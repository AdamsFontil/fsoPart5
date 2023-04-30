import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import signupService from './services/signup'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const [signup, setSignup] = useState(false)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )

    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])



  const addBlog = (blogObject) => {
    console.log('blog objects',blogObject)
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
    console.log('blog objects2',blogObject)
    setMessageType('success')
    setMessage(`a new blog ${blogObject.title} has been created by ${blogObject.author}`)
    setTimeout(() => {
      setMessage(null)
    }, 5000) // reset message after 5 seconds
  }

  const handleSignUp = async (event) => {
    event.preventDefault()
    console.log('signup b4',signup)
    console.log('signing up')
    setSignup(true)
    console.log('signup',signup)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
    setMessage('logging out')
    setMessageType('success')
    setTimeout(() => {
      setMessage(null)
    }, 3000)


  }

  const handleLogin = async (event) => {
    event.preventDefault()
    setUser(user)
    console.log(user,'is the user')

    try {
      console.log('username:', username, 'name:', name, 'password:', password)
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setMessageType('success')
      setMessage('logging in')

      setTimeout(() => {
        setMessage(null)
      }, 5000) // reset message after 5 seconds

      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessageType('error')
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000) // reset message after 5 seconds
    }
  }
  const handleCreateUser = async (event) => {
    event.preventDefault()
    try {
      console.log('username:', username, 'name:', name, 'password:', password)
      await signupService.signup({
        username, name, password,
      })
      console.log('create new user')
      setMessageType('success')
      setMessage('User created you may now login')
      setTimeout(() => {
        setMessage(null)
      }, 5000) // reset message after 5 seconds
      setUsername('')
      setName('')
      setPassword('')
      setSignup(false)
    } catch (exception) {
      setMessageType('error')
      setMessage('Couldnt create new user, maybe user already exists or password is too short')
      setTimeout(() => {
        setMessage(null)
      }, 5000) // reset message after 5 seconds
    }
  }

  const handleCancelSignup = () => {
    setSignup(false)
  }

  if (signup === true) {
    return (
      <div className='bg-emerald-500' style={{ height: '100vh' }} >
        <Notification message={message} type={messageType} />
        <div className='bg-emerald-500 p-24 bg-400 flex flex-col gap-8 text-4xl justify-center items-center '>
          <h2 className='text-6xl'>Create a new User</h2>
          <form className='flex gap-2 flex-col justify-center ' onSubmit={handleCreateUser}>
            <div>
              Name
              <input className='border-2 rounded-md m-4 mx-20'
                type="text"
                id='name'
                value={name}
                name="name"
                onChange={({ target }) => setName(target.value)}
              />
            </div>
            <div>
              Username
              <input className='border-2 rounded-md m-4'
                type="text"
                id='username'
                value={username}
                name="signupUsername"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              Password
              <input className='border-2 rounded-md m-6'
                type="password"
                id='password'
                value={password}
                name="signupPassword"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button className='bg-gray-400 p-4 border-2 rounded-md' type="submit" id='signup-button'>Sign up</button>
            <button className='bg-orange-300 p-4 border-2 rounded-md' type="submit" id='signup-button' onClick={handleCancelSignup}>Cancel</button>
          </form>
        </div>
      </div>
    )
  }


  if (user === null) {
    return (
      <div className='bg-emerald-500' style={{ height: '100vh' }} >
        <Notification message={message} type={messageType} />
        <div className='bg-emerald-500 p-24 bg-400 flex flex-col gap-8 text-4xl justify-center items-center '>
          <h2 className='text-6xl'>Log in to application</h2>
          <form className='flex gap-2 flex-col ' onSubmit={handleLogin}>
            <div>
        Username
              <input className='border-2 rounded-md m-4'
                type="text"
                id='username'
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
        Password
              <input className='border-2 rounded-md m-6'
                type="password"
                id='password'
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button className='bg-gray-400 p-4 border-2 rounded-md' type="submit" id='login-button'>Login</button>
            <button className='bg-orange-300 p-4 border-2 rounded-md' type="submit" id='signup-button' onClick={handleSignUp}>Sign up</button>
            {/* <p>Dont want to signup, <a>click here</a> to get the credentials for some sample users</p> */}
          </form>
          <Togglable buttonLabel='Dont want to sign up? Login with a sample user'>
            <div className='flex items-center flex-col'>
              <h2>These are the usernames, the password for all them is 12345</h2>
              <div className='flex gap-3 mb-3'>
                <p className='border-2 bg-emerald-500 rounded-md p-1'>Adams</p>
                <p className='border-2 bg-emerald-500 rounded-md p-1'>Mikey</p>
                <p className='border-2 bg-emerald-500 rounded-md p-1'>hellas</p>
                <p className='border-2 bg-emerald-500 rounded-md p-1'>mluukkai</p>
                <p className='border-2 bg-emerald-500 rounded-md p-1'>Adams1</p>
              </div>

            </div>
          </Togglable>
        </div>
      </div>
    )
  }






  return (
    <div className='bg-emerald-500 p-4 flex flex-col'>
      <Notification message={message} type={messageType} />
      <div className='flex justify-between'>
        <h2 className='text-4xl'>Blogs</h2>
        <p>{user.name} logged in <button className='bg-orange-400 p-2 border-2 rounded' onClick={handleLogout}>logout</button></p>
      </div>

      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog}/>
      </Togglable>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} />
      )}
    </div>
  )
}

export default App
