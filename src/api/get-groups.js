import axios from 'axios'

export default () => {
  return axios.get('/api/user/getGroups')
  .then(res => Promise.resolve(res.data.result), msg => Promise.reject(msg))
}
