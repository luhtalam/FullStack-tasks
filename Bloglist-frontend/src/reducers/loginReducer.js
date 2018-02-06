import blogService from '../services/blogs'
import userService from '../services/login'

const reducer = (store = JSON.parse(localStorage.getItem('loggedUser')), action) => {
  switch (action.type) {
    case 'ADD USER':
      console.log('user add')
      return action.data
    case 'DELETE USER':
      return null
    default:
      return store
  }
}

export const userLogin = (credentials) => {
  return async (dispatch) => {
    const user = await userService.login(credentials)
    localStorage.setItem('loggedUser', JSON.stringify(user))
    await blogService.setToken(user.token)
    dispatch({
      type: 'ADD USER',
      data: user
    })
  }
}

export const userLogout = () => {
  return (dispatch) => {
    localStorage.removeItem('loggedUser')
    dispatch({
      type: 'DELETE USER'
    })
  }
}

export const userInitialization = () => {
  return async (dispatch) => {
    console.log('init started')    
    const loggedUserJSON = await localStorage.getItem('loggedUser')
    console.log('localstorage ended')
    if (loggedUserJSON) {
      const user = await JSON.parse(loggedUserJSON)
      console.log('parsed')
      await blogService.setToken(user.token)
      console.log('token setted')
      dispatch({
        type: 'ADD USER',
        data: user
      })
    } else {
      dispatch({
        type: ''
      })
    }
  }
}

export default reducer