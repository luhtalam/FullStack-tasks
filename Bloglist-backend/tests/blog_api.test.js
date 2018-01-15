const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { format, initialBlogs, blogsInDb, nonExistingId, usersInDb } = require('./test_helper')

describe('When HTTP GET to /api/blogs', () => {

  beforeAll(async () => {
    await Blog.remove({})
    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('all blogs are returned as json', async () => {
    const blogsInDatabase = await blogsInDb()

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(blogsInDatabase.length)

    const returnedBlogs = response.body.map(format)
    blogsInDatabase.forEach(blog => {
      expect(returnedBlogs).toContainEqual(blog)
    })
  })
})

describe('When HTTP POST to /api/blogs', () => {

  test('a valid blog can be added', async () => {
    const blogsAtBeginning = await blogsInDb()

    const newBlog = {
      title: "POSTtest",
      author: "POST",
      url: "www.google.fi",
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterOperation = await blogsInDb()
    expect(blogsAfterOperation.length).toBe(blogsAtBeginning.length + 1)

    const blogs = blogsAfterOperation.map(format)
    expect(blogs).toContainEqual(newBlog)
  })

  test('a blog without likes is added with zero likes', async () => {
    const blogsAtBeginning = await blogsInDb()

    let newBlog = {
      title: "POSTtest",
      author: "POST",
      url: "www.google.fi",
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterOperation = await blogsInDb()
    expect(blogsAfterOperation.length).toBe(blogsAtBeginning.length + 1)

    const blogs = blogsAfterOperation.map(format)
    newBlog['likes'] = 0
    expect(blogs).toContainEqual(newBlog)
  })

  test('a blog without title fails with right statuscode', async () => {
    const blogsAtBeginning = await blogsInDb()

    let newBlog = {
      author: "POST",
      url: "www.google.fi",
      likes: 4
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAfterOperation = await blogsInDb()
    expect(blogsAfterOperation.length).toBe(blogsAtBeginning.length)
  })

  test('a blog without url fails with right statuscode', async () => {
    const blogsAtBeginning = await blogsInDb()

    let newBlog = {
      title: "POSTtest",
      author: "POST",
      likes: 6
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAfterOperation = await blogsInDb()
    expect(blogsAfterOperation.length).toBe(blogsAtBeginning.length)
  })
})

describe('When HTTP DELETE to /api/blogs/:id', () => {
  let addedBlog

  beforeAll(async () => {
    await Blog.remove({})
    addedBlog = new Blog({
      title: 'DELETEBlog',
      author: 'DELETE',
      url: "www.google.fi",
      likes: 2
    })
    await addedBlog.save()
  })

  test('a blog with valid id is removed', async () => {
    const blogsAtBeginning = await blogsInDb()

    await api
      .delete(`/api/blogs/${addedBlog._id}`)
      .expect(204)

    const blogsAfterOperation = await blogsInDb()
    expect(blogsAfterOperation.length).toBe(blogsAtBeginning.length - 1)
    expect(blogsAfterOperation).not.toContainEqual(format(addedBlog))
  })

  test('with invalid id, it fails with right statuscode', async () => {
    const blogsAtBeginning = await blogsInDb()
    await api
      .delete(`/api/blogs/1234`)
      .expect(400)
    const blogsAfterOperation = await blogsInDb()
    expect(blogsAfterOperation.length).toBe(blogsAtBeginning.length)
  })
})

describe.only('When logged in', () => {

  beforeAll(async () => {
    await Blog.remove({})
    await User.remove({})
    const user1 = {
      username: 'User1',
      name: 'SuperUser',
      password: 'salainen'
    }
    const user2 = {
      username: 'User2',
      name: 'SuperUser',
      password: 'salainen'
    }
    await api
      .post('/api/users')
      .send(user1)
    await api
      .post('/api/users')
      .send(user2)
  })

  test('you can remove blog which is created by you', async () => {
    const user = await api
      .post('/api/login')
      .send({ username: 'User1', password: 'salainen' })
      .expect(200)

    const blog = {
      title: "title",
      author: "author",
      url: "url",
      likes: 2
    }
    const addedBlog = await api
      .post('/api/blogs')
      .set("Authorization", 'Bearer ' + user.body.token)
      .send(blog)
      .expect(201)

    const blogsAtBeginning = await blogsInDb()
    await api
      .delete(`/api/blogs/${addedBlog.body._id}`)
      .set("Authorization", 'Bearer ' + user.body.token)
      .expect(204)

    const blogsAfterOperation = await blogsInDb()
    expect(blogsAfterOperation.length).toBe(blogsAtBeginning.length - 1)

    const blogs = blogsAfterOperation.map(b => {
      return {
        title: b.title,
        author: b.author,
        url: b.url,
        likes: b.likes
      }
    })
    expect(blogs).not.toContainEqual(blog)
  })

  test('you cannot remove blog which is created by someone else', async () => {
    let user = await api
      .post('/api/login')
      .send({ username: 'User1', password: 'salainen' })
      .expect(200)

    const blog = {
      title: "title",
      author: "author",
      url: "url",
      likes: 2
    }
    const addedBlog = await api
      .post('/api/blogs')
      .set("Authorization", 'Bearer ' + user.body.token)
      .send(blog)
      .expect(201)

    const blogsAtBeginning = await blogsInDb()

    user = await api
      .post('/api/login')
      .send({ username: 'User2', password: 'salainen' })
      .expect(200)

    const result = await api
      .delete(`/api/blogs/${addedBlog.body._id}`)
      .set("Authorization", 'Bearer ' + user.body.token)
      .expect(401)

    expect(result.body).toEqual({ error: 'cannot remove someone else\'s blog' })

    const blogsAfterOperation = await blogsInDb()
    expect(blogsAfterOperation.length).toBe(blogsAtBeginning.length)

    const blogs = blogsAfterOperation.map(b => {
      return {
        title: b.title,
        author: b.author,
        url: b.url,
        likes: b.likes
      }
    })
    expect(blogs).toContainEqual(blog)
  })
})

describe('When HTTP PUT to /api/blogs/:id', () => {
  let addedBlog

  beforeAll(async () => {
    await Blog.remove({})
    addedBlog = new Blog({
      title: 'DELETEBlog',
      author: 'DELETE',
      url: "www.google.fi",
      likes: 2
    })
    await addedBlog.save()
  })

  test('likes of a blog with valid id is updated', async () => {
    const blogsAtBeginning = await blogsInDb()

    const updatedBlog = {
      title: 'DELETEBlog',
      author: 'DELETE',
      url: "www.google.fi",
      likes: 123
    }
    await api
      .put(`/api/blogs/${addedBlog._id}`)
      .send(updatedBlog)
      .expect(200)

    const blogsAfterOperation = await blogsInDb()
    expect(blogsAfterOperation.length).toBe(blogsAtBeginning.length)
    expect(blogsAfterOperation).toContainEqual(updatedBlog)
  })

  test('with invalid id, it fails with right statuscode', async () => {
    const blogsAtBeginning = await blogsInDb()

    const updatedBlog = {
      title: 'DELETEBlog',
      author: 'DELETE',
      url: "www.google.fi",
      likes: 124
    }
    await api
      .put(`/api/blogs/${1234}`)
      .send(updatedBlog)
      .expect(400)

    const blogsAfterOperation = await blogsInDb()
    expect(blogsAfterOperation.length).toBe(blogsAtBeginning.length)
    expect(blogsAfterOperation).not.toContainEqual(updatedBlog)
  })
})

afterAll(() => {
  server.close()
})