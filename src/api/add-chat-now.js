import axios from 'axios'

export default user => {
  return axios.post('/api/user/addChatNow', {
    user: user
  })
  .then(res => Promise.resolve(res.data.result), msg => Promise.reject(msg))
}
