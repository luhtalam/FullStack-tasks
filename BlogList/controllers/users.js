const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    if (! await validateUser(body, response)) {
      return response
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      adult: body.adult || true,
      passwordHash
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something whent wrong...' })
  }
})

const validateUser = async (body, response) => {
  if (body.username.length < 3) {
    response.status(400).json({ error: 'username length must be at least 3' })
    return false
  }
  const existingUser = await User.find({ username: body.username })
  if (existingUser.length > 0) {
    response.status(400).json({ error: 'username must be unique' })
    return false
  } else if (body.password.length < 3) {
    response.status(400).json({ error: 'password length must be at least 3' })
    return false
  }
  return true
}

const formatUser = (user) => {
  return {
    id: user._id,
    username: user.username,
    name: user.name,
    adult: user.adult,
    blogs: user.blogs
  }
}

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { title: 1, url: 1 })
  response.json(users.map(formatUser))
})

module.exports = usersRouter