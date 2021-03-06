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
    user: {username: blog.user.username}
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

const validateTitleAndUrl = (body) => {
  if (body.title === undefined || body.title === '') {
    return false
  } else if (body.url === undefined || body.url === '') {
    return false
  }
  return true
}

blogsRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      console.log('token missing')
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (!validateTitleAndUrl(body)) {
      return response.status(400).json({ error: 'title or url missing' })
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
    Blog.populate(savedBlog, 'user')

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(formatBlog(savedBlog))
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something whent wrong...' })
    }
  }
})

blogsRouter.patch('/:id', async (request, response) => {
  try {
    const body = request.body
    const updatedBlog = await Blog
      .findByIdAndUpdate(request.params.id, body, { new: true })
      .populate('user', { username: 1, name: 1 })
    response.json(formatBlog(updatedBlog))
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