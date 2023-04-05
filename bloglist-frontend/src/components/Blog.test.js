import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Adams',
    url: 'adamsissickwithit.com',
    likes: 3
  }

  const { container } = render(<Blog blog={blog} />)
  screen.debug()
  const noDetails = container.querySelector('.noDetails')
  expect(noDetails).toBeDefined()
  screen.debug(container)
  screen.debug(noDetails)
  expect(noDetails).toHaveTextContent(blog.title)
  expect(noDetails).toHaveTextContent(blog.author)
  expect(noDetails).not.toHaveTextContent(blog.url)
  expect(noDetails).not.toHaveTextContent(blog.likes)
})

test('clicking the button calls event handler once', async () => {
  const blog = {
    title: 'testing is done with react-testing-library',
    author: 'Arto Hellas',
    url: 'adamsissickwithit.com',
    likes: 30
  }

  const mockHandler = jest.fn()

  const { container } = render(<Blog blog={blog} handleViewClick={mockHandler} />)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  screen.debug()


  console.log(mockHandler.mock.calls)


  // console.log(mockHandler.mock.calls)

  const details = container.querySelector('.details')
  expect(details).toBeDefined()
  expect(details).toHaveTextContent(blog.title)
  expect(details).toHaveTextContent(blog.author)
  expect(details).toHaveTextContent(blog.url)
  expect(details).toHaveTextContent(blog.likes)
  // screen.debug(details)
})



test('clicking the like button twice', async () => {
  const blog = {
    title: 'testing',
    author: 'Arto Hellas',
    url: 'adamsissickwithit.com',
    likes: 30
  }

  const mockHandler = jest.fn()

  const { container } = render(<Blog blog={blog} handleViewClick={mockHandler} />)
  const user = userEvent.setup()
  const button = container.querySelector('.viewBtn')
  await user.click(button)
  screen.debug()

  // console.log(mockHandler.mock.calls)
  const likeBtn = container.querySelector('.likeBtn')
  await user.click(likeBtn)
  await user.click(likeBtn)
  screen.degug()


  expect(mockHandler.mock.calls).toHaveLength(2)
  // console.log(mockHandler.mock.calls)
})
