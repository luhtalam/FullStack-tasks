import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

class Anecdote extends React.Component {
  voteAnecdote = (anecdote) => () => {
    const notification = `you voted '${anecdote.content}'`
    this.props.addVote(anecdote)
    this.props.notify(notification,5)
  }

  render() {
    const style = {
      marginBottom: 10,
    }
    const anecdote = this.props.anecdote
    return (
      <div style={style} key={anecdote.id}>
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
  { addVote, notify }
)(Anecdote)