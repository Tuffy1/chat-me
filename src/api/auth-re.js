import axios from 'axios'

export default () => {
  return axios.post('/api/auth/re')
  .then(res => Promise.resolve(res.data.result), msg => Promise.reject(msg))
}
