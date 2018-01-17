import React from 'react'
import blogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      blog: props.blog
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  addLike = async (e) => {
    e.preventDefault()
    const blogObject = {
      user: this.state.blog.user,
      likes: this.state.blog.likes + 1,
      author: this.state.blog.author,
      title: this.state.blog.title,
      url: this.state.blog.url,
    }
    const updatedBlog = await blogService.update(this.state.blog.id, blogObject)
    this.setState({ blog: updatedBlog })
  }

  deleteBlog = async (e) => {
    e.preventDefault()
    if (window.confirm(`delete ${this.state.blog.title} ${this.state.blog.author}?`)){
      await blogService.remove(this.state.blog.id)
    }
  }

  render() {

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    if (this.state.visible) {
      return (
        <div style={blogStyle} onClick={this.toggleVisibility} className='info'>
          {this.state.blog.title} {this.state.blog.author}
          <ul>
            <li>{this.state.blog.url}</li>
            <li>{`${this.state.blog.likes} likes `}
              <button onClick={this.addLike}>like</button>
            </li>
          </ul>
          {`added by ${this.state.blog.user.username}`}
          <br/><button onClick={this.deleteBlog}>delete</button>
        </div>
      )
    }
    return (
      <div style={blogStyle} onClick={this.toggleVisibility} className='info'>
        {this.state.blog.title} {this.state.blog.author}
      </div>
    )
  }
}

export default Blog