import axios from 'axios'

export default form => {
  return axios.post('/api/user/register', {
    username: form.username,
    password: form.password
  })
  .then(result => Promise.resolve(), msg => Promise.reject(msg))
}
