import axios from 'axios'

export default user => {
  return axios.post('/api/user/newFriend', {
    user: user
  })
  .then(res => Promise.resolve(res.data.result), msg => Promise.reject(msg))
}
