import React from 'react'
import { connect } from 'react-redux'
import { userLogin, userLogout } from '../reducers/loginReducer'
import { notify } from '../reducers/notificationReducer'


class LoginForm extends React.Component {

  login = async (e) => {
    e.preventDefault()
    let notification = ''
    try {
      const user = {
        username: e.target.username.value,
        password: e.target.password.value
      }
      await this.props.userLogin(user)
      notification = `${user.username} logged in`
      //e.target.username.value = ''
      //e.target.password.value = null
      this.props.history.push('/')
    } catch (error) {
      notification = 'wrong username or password'
    }
    this.props.notify(notification, 5)
  }

  logout = () => {
    const notification = `${this.props.user.username} logged out`
    this.props.userLogout()
    this.props.notify(notification, 5)
  }

  render() {
    return (
      <div>
        <h2>Login to application</h2>
        <form onSubmit={this.login}>
          <div>
            username:
          <input type='text' name='username' />
          </div>
          <div>
            password:
          <input type='password' name='password' />
          </div>
          <button>login</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  { userLogin, userLogout, notify }
)(LoginForm)