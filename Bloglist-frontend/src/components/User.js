import React from 'react'
//import { connect } from 'react-redux'
//import { usersInitialization } from '../reducers/userReducer'


class User extends React.Component {

  render() {
    return (
      <div>
        <h2>{this.props.user.username}</h2>
        <div>
          <h3>Added blogs</h3>
          <ul>
            {this.props.user.blogs.map(blog => (
              <li key={blog._id}>{blog.title}</li>
            )
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default User