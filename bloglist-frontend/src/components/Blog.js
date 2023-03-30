import { useState } from "react";
import BlogService from '../services/blogs'
const loggedBlogUser = JSON.parse(window.localStorage.getItem('loggedBlogUser'))
const name = loggedBlogUser.name

const Blog = ({ blog, blogs, setBlogs }) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const handleHideClick = () => {
    setVisible(false);
  };

  const handleViewClick = () => {
    setVisible(true);
  };

 const handleLikeClick = async () => {
  console.log('liked');
  console.log(blog);
  const { user, ...blogWithoutUser } = blog;
const updatedBlog = { ...blogWithoutUser, likes: blog.likes + 1 };
  // updatedBlog.user =
  console.log('user',updatedBlog.user);
  const response = await BlogService.update(blog.id, updatedBlog);
  console.log('updated blog:', response);
  setLikes(response.likes);
};

const handleRemoveClick = async () => {
  const remove = window.confirm(`are you sure you want to remove ${blog.title} by ${blog.author} `)
  if (remove) {
    console.log('removing...')
    const response = await BlogService.remove(blog.id)
    console.log(response)
    const updatedBlogs = blogs.filter((b) => b.id !== blog.id);
      setBlogs(updatedBlogs);
  }

}

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div style={blogStyle}>
      {visible ? (
        <div>
          <div>
            {blog.title}
            <button onClick={handleHideClick}> hide</button>
          </div>
          <div>{blog.url}</div>
          <div>
            likes {likes}
            <button onClick={handleLikeClick}>like</button>
          </div>
          <div>{blog.author}</div>
          <div>{blog.user && blog.user.name ? blog.user.name : name}</div>
          <button onClick={handleRemoveClick}>remove</button>
        </div>
      ) : (
        <div>
          {blog.title} {blog.author}
          <button onClick={handleViewClick}> view</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
