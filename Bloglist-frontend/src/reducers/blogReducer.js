import blogService from '../services/blogs'

const reducer = (store = [], action) => {
  switch (action.type) {
    case 'CREATE BLOG':
      return [...store, action.data]
    case 'INIT BLOGS':
      return action.data
    case 'DELETE BLOG':
      return store.filter(b => b.id !== action.id)
    case 'LIKE BLOG':
      return store.map(b => b.id === action.data.id ? action.data : b)
    default:
      return store
  }
}

export const blogInitialization = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT BLOGS',
      data: blogs
    })
  }
}

export const blogCreation = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    console.log(newBlog)
    dispatch({
      type: 'CREATE BLOG',
      data: newBlog
    })
  }
}

export const blogDeletion = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE BLOG',
      id
    })
  }
}

export const addLike = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog.id, { likes: blog.likes + 1 })
    dispatch({
      type: 'LIKE BLOG',
      data: updatedBlog
    })
  }
}

export default reducer