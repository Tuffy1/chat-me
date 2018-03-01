import axios from 'axios'

export default form => {
  return axios.post('/api/user/register', form)
  .then(() => Promise.resolve(), msg => Promise.reject(msg))
}
