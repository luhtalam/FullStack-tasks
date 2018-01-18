import React from 'react'
import { connect } from 'react-redux'
import Filter from './Filter'
import Anecdote from './Anecdote'

class AnecdoteList extends React.Component {
  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {this.props.visibleAnecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <Anecdote anecdote={anecdote} />
          </div>
        )}
      </div>
    )
  }
}

const anecdotesToShow = (anecdotes, filter) => {
  const filteredAnecdotes = anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase()))

  const byVotes = (anecdote1, anecdote2) => anecdote2.votes - anecdote1.votes
  return filteredAnecdotes.sort(byVotes)
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}

export default connect(mapStateToProps)(AnecdoteList)