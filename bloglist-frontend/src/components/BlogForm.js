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
    <form onSubmit={handleBlogSubmit}>
      <h2>create new</h2>
      <div>
        title: <input id='title' name="title" value={newBlog.title} onChange={handleBlogChange} />
      </div>
      <div>
        author: <input id='author' name="author" value={newBlog.author} onChange={handleBlogChange} />
      </div>
      <div>
        url: <input id='url' name="url" value={newBlog.url} onChange={handleBlogChange} />
      </div>
      <div>
        url: <input id='likes' name="likes" value={newBlog.likes} onChange={handleBlogChange} />
      </div>
      <button type="submit">Create</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}


export default BlogForm
