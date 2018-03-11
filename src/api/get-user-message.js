import axios from 'axios'

export default () => {
  return axios.get('/api/message/getUserMessage')
  .then(res => Promise.resolve(res.data.result), msg => Promise.reject(msg))
}
