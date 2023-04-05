import { useState } from 'react'
import BlogService from '../services/blogs'
const loggedBlogUser = JSON.parse(window.localStorage.getItem('loggedBlogUser'))
const name = loggedBlogUser ? loggedBlogUser.name : null

const Blog = ({ blog, blogs, setBlogs }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const handleHideClick = () => {
    setVisible(false)
  }

  const handleViewClick = () => {
    console.log('handleViews')
    setVisible(true)
  }

  const handleLikeClick = async () => {
    console.log('liked')
    console.log(blog)
    const { user, ...blogWithoutUser } = blog
    console.log('user', user)
    const updatedBlog = { ...blogWithoutUser, likes: likes + 1 } //change likes: likes + 1 to likes: blog.likes + 1 to limit user ability to like to just one
    // updatedBlog.user =
    console.log('user',updatedBlog.user)
    const response = await BlogService.update(blog.id, updatedBlog)
    console.log('updated blog:', response)
    setLikes(response.likes)
    setBlogs(blogs.map(b => b.id === response.id ? response : b))
  }


  const handleRemoveClick = async () => {
    const remove = window.confirm(`are you sure you want to remove ${blog.title} by ${blog.author} `)
    if (remove) {
      console.log('removing...')
      const response = await BlogService.remove(blog.id)
      console.log(response)
      const updatedBlogs = blogs.filter((b) => b.id !== blog.id)
      setBlogs(updatedBlogs)
    }

  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blog'>
      {visible ? (
        <div className='details'>
          <div>
            {blog.title}
            <button onClick={handleHideClick}> hide</button>
          </div>
          <div>{blog.url}</div>
          <div>
            likes {likes}
            <button onClick={handleLikeClick} className='likeBtn' >like</button>
          </div>
          <div>{blog.author}</div>
          <div>{blog.user && blog.user.name ? blog.user.name : name}</div>
          {blog.user && blog.user.name === name &&
          <button onClick={handleRemoveClick} >remove</button>}
        </div>
      ) : (
        <div className='noDetails'>
          {blog.title} {blog.author}
          <button onClick={handleViewClick} className='viewBtn' > view</button>
        </div>
      )}
    </div>
  )
}

export default Blog
