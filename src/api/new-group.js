import axios from 'axios'

export default form => {
  return axios.post('/api/user/newGroup', {
    group: form
  })
  .then(res => Promise.resolve(res.data.result), msg => Promise.reject(msg))
}
