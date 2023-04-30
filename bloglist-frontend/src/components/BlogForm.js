import { useState } from 'react'
import PropTypes from 'prop-types'
const BlogForm = ({ createBlog }) => {

  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '', likes: '' })

  const handleBlogChange = (event) => {
    const { name, value } = event.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  const handleBlogSubmit = async (event) => {
    event.preventDefault()
    const { title, author, url } = newBlog
    createBlog({ title, author, url })
    setNewBlog({ title: '', author: '', url: '', likes: '' })
  }

  return (
    <form className=' flex text-lg gap-2 flex-col items-start' onSubmit={handleBlogSubmit}>
      <h2 className='text-2xl'>create new</h2>
      <div>
        title: <input className='border-2 rounded-md' id='title' name="title" value={newBlog.title} onChange={handleBlogChange} />
      </div>
      <div>
        author: <input className='border-2 rounded-md'  id='author' name="author" value={newBlog.author} onChange={handleBlogChange} />
      </div>
      <div>
        url: <input className='border-2 rounded-md'  id='url' name="url" value={newBlog.url} onChange={handleBlogChange} />
      </div>
      <button className='text-xl bg-emerald-500 p-1 border-2 rounded-md my-2' type="submit">Create</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}


export default BlogForm
