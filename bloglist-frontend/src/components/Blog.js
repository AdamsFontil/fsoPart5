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
    console.log('likedy')
    console.log(blog)
    const { user, ...blogWithoutUser } = blog
    console.log('user', user)
    const updatedBlog = { ...blogWithoutUser, likes: blog.likes + 1 } //change likes: likes + 1 to likes: blog.likes + 1 to limit user ability to like to just one
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
  return (
    <div className='blog m-2'>
      {visible ? (
        <div className='details flex justify-between p-2'>
          <div>
            <div className='flex justify-between'>
              Title: {blog.title}
            </div>
            <div>Url: {blog.url}</div>
            <div className='flex justify-between'>
            Likes: {likes}

            </div>
            <div>Author: {blog.author}</div>
            <div >Created by: {blog.user && blog.user.name ? blog.user.name : name}</div>
          </div>
          <div className='flex flex-col'>
            <button className=' bg-gray-400 border-2 rounded-md p-2' onClick={handleHideClick}> hide</button>
            <button  onClick={handleLikeClick} className='likeBtn bg-emerald-500 border-2 rounded-md p-2' >like</button>
            {blog.user && blog.user.name === name &&
          <button className='bg-orange-400 border-2 rounded-md p-2' onClick={handleRemoveClick} >remove</button>}
          </div>
        </div>
      ) : (
        <div className='noDetails flex justify-between p-2'>
          <div className='flex gap-4'>
            <div>{blog.title}</div>
            <div className='bg-emerald-500'>Author: {blog.author}</div>
          </div>.
          <button onClick={handleViewClick} className='viewBtn' > view</button>
        </div>
      )}
    </div>
  )
}

export default Blog
