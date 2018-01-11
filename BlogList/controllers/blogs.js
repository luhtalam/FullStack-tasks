const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const formatBlog = (blog) => {
  return {
    id: blog._id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    user: blog.user
  }
}

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', { username: 1, name: 1 })
    response.json(blogs.map(formatBlog))
  } catch (exception) {
    console.log(exception)
    response.status(500).send({ error: exception })
  }
})

blogsRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (body.title === undefined || body.url === undefined) {
      return response.status(400).end()
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes ? body.likes : 0,
      user: user._id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something whent wrong...' })
    }
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    const body = request.body
    const blog = ({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    })
    const updatedBlog = await Blog
      .findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
  } catch (exception) {
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() === decodedToken.id) {
      await blog.remove()
      response.status(204).end()
    } else {
      response.status(401).json({ error: 'cannot remove someone else\'s blog' })
    }
  } catch (exception) {
    response.status(400).send({ error: 'malformatted id' })
  }
})

module.exports = blogsRouter