import axios from 'axios'

export default () => {
  return axios.get('/api/message/getUserMessage')
  .then(res =>{
    if (res.data.success) {
      Promise.resolve(res.data.result)
    }
    Promise.reject(msg)
  }, () => Promise.reject('无法连接服务器'))
}
