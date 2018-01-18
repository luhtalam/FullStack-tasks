import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (content) => {
  return {
    content,
    id: getId(),
    votes: 0
  }
}
const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const createNew = async (content) => {
  const response = await axios.post(url, asObject(content))
  return response.data
}

const update = async (id, updatedData) => {
  const response = await axios.patch(`${url}/${id}`, updatedData)
  return response.data
}

export default { getAll, createNew, update }