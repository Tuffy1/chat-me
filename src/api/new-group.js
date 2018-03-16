import axios from 'axios'

export default form => {
  return axios.post('/api/user/newGroup', {
    group: form
  })
  .then(res =>{
    if (res.data.success) {
      Promise.resolve(res.data.result)
    }
    Promise.reject(msg)
  }, () => Promise.reject('无法连接服务器'))
}
