import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const request =  await axios.get(baseUrl)
  return request.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { 'Authorization': token }
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

const update = async (id, updatedData) => {
  // const config = {
  //   headers: { 'Authorization': token }
  // }
  const response = await axios.patch(`${baseUrl}/${id}`, updatedData)
  return response.data
}

export default { getAll, create, setToken, update, remove }