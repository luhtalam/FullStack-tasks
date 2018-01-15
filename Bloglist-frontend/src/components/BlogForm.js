import React from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'

class BlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: '',
      user: props.user,
      message: null
    }
  }

  handleFieldChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  addNew = async (e) => {
    e.preventDefault()
    try {
      const newBlog = {
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      }
      await blogService.create(newBlog)
      this.setState({
        title: '',
        author: '',
        url: '',
        message: 'a new blog added'
      })
    } catch (error) {
      this.setState({message: 'can not add a new blog with these fields'})
    }
    setTimeout(() => {
      this.setState({ message: null })
    }, 5000)
  }

  render() {
    return (
      <div>
        <h2>Add new blog</h2>
        <form onSubmit={this.addNew}>
          <div>
            title:
          <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleFieldChange}
            />
          </div>
          <div>
            author:
          <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleFieldChange}
            />
          </div>
          <div>
            url:
          <input
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.handleFieldChange}
            />
          </div>
          <button>add</button>
        </form>
        <Notification message={this.state.message} />
      </div>
    )
  }
}

export default BlogForm