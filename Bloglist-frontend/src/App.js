import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      username: '',
      password: '',
      message: null,
      blogs: []
    }
  }

  componentWillMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  handleLoginFieldChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  login = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({ message: 'wrong username or password ' })
      setTimeout(() => {
        this.setState({ message: null })
      }, 5000)
    }
  }

  logout = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('loggedUser')

    this.setState({
      message: `${this.state.user.username} logged out`,
      user: null
    })
    setTimeout(() => {
      this.setState({ message: null })
    }, 5000)
  }

  loginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={this.login}>
          <div>
            username:
          <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            password:
          <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button>login</button>
        </form>
      </div>
    )
  }

  blogForm = () => {
    return (
      <div>
        <p>add new blog</p>
      </div>
    )
  }

  blogs = () => {
    return (
      <div>
        <h2>Blogs</h2>
        {this.state.blogs.length !== 0 ? this.state.blogs.map(blog =>
          <Blog key={blog._id} blog={blog} />
        ) : "no added blogs"}
      </div>
    )
  }

  render() {
    if (this.state.user === null) {
      return (
        <div>
          <Notification message={this.state.message} />
          {this.loginForm()}
        </div>
      )
    }
    return (
      <div>
        <div>
          <Notification message={this.state.message} />
          <p>{`${this.state.user.username} logged in `}
            <button onClick={this.logout}>logout</button>
          </p>
        </div>
        <div>
          <Togglable buttonLabel='new blog'>
            <BlogForm user={this.state.user} />
          </Togglable>
        </div>
        <div>
          <h2>Blogs</h2>
          {this.state.blogs.map(blog => 
          <Blog key={blog.id} blog={blog} />)}
        </div>
      </div>
    )
  }
}

export default App;
