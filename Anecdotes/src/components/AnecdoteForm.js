import React from 'react'

class AnecdoteForm extends React.Component {
  addNewAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.store.dispatch({
      type: 'CREATE',
      content
    })
    e.target.anecdote.value = ''
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

export default AnecdoteForm