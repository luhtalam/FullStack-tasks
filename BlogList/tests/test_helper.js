const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: "test1",
    author: "test1",
    url: "http//localhost/test1",
    likes: 1
  },
  {
    title: "test2",
    author: "test2",
    url: "http//localhost/test2",
    likes: 2
  },
  {
    title: "test3",
    author: "test3",
    url: "http//localhost/test3",
    likes: 3
  }
]

const format = (blog) => {
  return {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }
}

const nonExistingId = async () => {
  const blog = new Blog({
    title: "test",
    author: "test",
    url: "http//localhost/test",
    likes: 1
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(format)
}

const usersInDb = async () => {
  const users = await User.find({})
  return users
}

module.exports = { initialBlogs, format, blogsInDb, nonExistingId, usersInDb }