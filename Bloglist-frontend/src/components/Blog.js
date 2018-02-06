import React from 'react'
import { connect } from 'react-redux'
import { blogDeletion, addLike } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

class Blog extends React.Component {

  deleteBlog = async (e) => {
    e.preventDefault()
    if (window.confirm(`delete ${this.props.blog.title} ${this.props.blog.author}?`)) {
      let notification = ''
      try {
        await this.props.blogDeletion(this.props.blog.id)
        notification = `${this.props.blog.title} deleted`
      } catch (error) {
        notification = 'something went wrong'
      }
      this.props.notify(notification, 5)
    }
  }

  addLike = async () => {
    let notification = ''
    try {
      await this.props.addLike(this.props.blog)
      notification = `you liked ${this.props.blog.title}`
    } catch (error) {
      notification = `cannot add like to ${this.props.blog.title}`
    }
    this.props.notify(notification,5)
  }

  render() {

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    return (
      <div style={blogStyle} className='info'>
        {this.props.blog.title} {this.props.blog.author}
        <ul>
          <li>{this.props.blog.url}</li>
          <li>{`${this.props.blog.likes} likes `}
            <button onClick={this.addLike}>like</button>
          </li>
        </ul>
        {`added by ${this.props.blog.user.username}`}
        <br />
        <button onClick={this.deleteBlog}>delete</button>
      </div>
    )
  }
}

export default connect(
  null,
  { blogDeletion, addLike, notify }
)(Blog)