import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { blogInitialization } from './reducers/blogReducer'
import { userInitialization, userLogout } from './reducers/loginReducer'
import { usersInitialization } from './reducers/userReducer'
import { notify } from './reducers/notificationReducer'
import Notification from './components/Notification'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import User from './components/User'

class App extends React.Component {
  componentWillMount() {
    console.log(1)
    //this.props.userInitialization()
    console.log(2)
    this.props.blogInitialization()
    console.log(3)
    this.props.usersInitialization()
    console.log(4)
  }

  logout = () => {
    const notification = `${this.props.loggedUser.username} logged out`
    this.props.userLogout()
    this.props.notify(notification, 5)
  }

  userById = (id) => {
    console.log(id)
    console.log(this.props.users)
    return this.props.users.find(user => user.id === id)
  }

  render() {
    console.log('render')
    console.log(this.props.loggedUser)
    return (
      <div>
        <Notification />
        <h1>Blog app</h1>
        <div>
          {this.props.loggedUser
            ? <p>
              {`${this.props.loggedUser.username} logged in `}
              <button onClick={this.logout}>logout</button>
            </p>
            : ''}
        </div>
        <div>
          <Route exact path='/' render={() => {
            if (this.props.loggedUser) {
              return <Home />
            } else {
              return <Redirect to='/login' />
            }
          }} />
          <Route exact path='/login' render={({ history }) => <LoginForm history={history} />} />
          <Route exact path='/users' component={UserList} />
          <Route exact path='/users/:id' render={({ match }) => <User user={this.userById(match.params.id)}/>} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser,
    users: state.users
  }
}

export default connect(
  mapStateToProps,
  { blogInitialization, userInitialization, usersInitialization, notify, userLogout }
)(App)
