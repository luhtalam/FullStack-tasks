import React from 'react'
import { connect } from 'react-redux'
import { blogCreation } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'


class BlogForm extends React.Component {
  addNewBlog = async (e) => {
    e.preventDefault()
    let notification = ''
    try {
      const blog = {
        title: e.target.title.value,
        author: e.target.author.value,
        url: e.target.url.value
      }
      await this.props.blogCreation(blog)
      // e.target.title.value = ''
      // e.target.author.value = ''
      // e.target.url.value = ''      
      notification = 'a new blog added'
    } catch (error) {
      notification = 'can not add a new blog with these fields'
    }
    this.props.notify(notification, 5)
  }

  render() {
    return (
      <div>
        <h2>Add new blog</h2>
        <form onSubmit={this.addNewBlog}>
          <div>
            title:
           <input type='text' name='title' />
          </div>
          <div>
            author:
          <input type='text' name='author' />
          </div>
          <div>
            url:
          <input type='text' name='url' />
          </div>
          <button>add</button>

        </form>
      </div>
    )
  }
}

export default connect(
  null,
  { blogCreation, notify }
)(BlogForm)