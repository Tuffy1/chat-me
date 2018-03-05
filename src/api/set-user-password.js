import axios from 'axios'

export default form => {
  return axios.post('/api/user/setUserPassword', form)
  .then(() => Promise.resolve(), msg => Promise.reject(msg))
}
