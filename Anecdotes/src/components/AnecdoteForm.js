import React from 'react'
import { connect } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'
import { notificationSetting, notificationDeletion } from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  addNewAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    const notification = `you added ${content}`
    e.target.anecdote.value = ''
    this.props.createNew(content)
    this.props.notificationSetting(notification)
    setTimeout(() => {
      this.props.notificationDeletion()
    }, 5000)
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.addNewAnecdote}>
          <div><input name='anecdote' /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default connect(
  null,
  { createNew, notificationSetting, notificationDeletion }
)(AnecdoteForm)