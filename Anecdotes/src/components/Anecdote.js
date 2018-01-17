import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { notificationSetting, notificationDeletion } from '../reducers/notificationReducer'

class Anecdote extends React.Component {
  voteAnecdote = (anecdote) => () => {
    const notification = `you voted '${anecdote.content}'`
    this.props.addVote(anecdote.id)
    this.props.notificationSetting(notification)
    setTimeout(() => {
      this.props.notificationDeletion()
    }, 5000)
  }

  render() {
    const anecdote = this.props.anecdote
    return (
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          {`has ${anecdote.votes} `}
          <button onClick={this.voteAnecdote(anecdote)}>
            vote
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
  }
}

export default connect(
  mapStateToProps,
  { addVote, notificationSetting, notificationDeletion }
)(Anecdote)