import axios from 'axios'

export default form => {
  return axios.post('/api/user/userSearch', {
    query: form.query
  })
  .then(res => Promise.resolve(res.data.result), msg => Promise.reject(msg))
}
