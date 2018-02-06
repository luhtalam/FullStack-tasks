import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { usersInitialization } from '../reducers/userReducer'

class UserList extends React.Component {

  render() {
    return (
      <div>
        <h2>users</h2>
        <table>
          <tbody>
            <tr>
              <td>
                <strong>username</strong>
              </td>
              <td>
                <strong>blogs added</strong>
              </td>
            </tr>
            {this.props.users.map(user => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </td>
                <td>
                  {user.blogs.length}
                </td>
              </tr>
            )
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(
  mapStateToProps,
  { usersInitialization }
)(UserList)