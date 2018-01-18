import anecdoteService from '../services/anecdotes'

const reducer = (store = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const voted = store.find(a => a.id === action.id)
      return store.map(a => a.id === action.id ? { ...voted, votes: voted.votes + 1 } : a)
    case 'CREATE':
      return [...store, action.data]
    case 'INIT':
      return action.data
    default:
      return store
  }
}

const anecdoteInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

const addVote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.update(anecdote.id, {votes: anecdote.votes +1})
    dispatch({
      type: 'VOTE',
      id: anecdote.id
    })
  }
}

const createNew = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export { anecdoteInitialization, addVote, createNew }

export default reducer