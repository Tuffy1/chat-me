import axios from 'axios'

export default form => {
  return axios.post('/api/user/setUserInfo', form)
  .then(() => Promise.resolve(), msg => Promise.reject(msg))
}
