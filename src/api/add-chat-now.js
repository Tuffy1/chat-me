import axios from 'axios'

export default user => {
  return axios.post('/api/user/addChatNow', {
    user: user
  })
  .then(res =>{
    if (res.data.success) {
      Promise.resolve(res.data.result)
    }
    Promise.reject(msg)
  }, () => Promise.reject('无法连接服务器'))
}
