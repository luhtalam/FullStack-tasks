const reducer = (store = "", action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter
    default:
      return store
  }
}

export const filterChange = (filter) => {
  return {
    type: 'SET_FILTER',
    filter
  }
}

export default reducer