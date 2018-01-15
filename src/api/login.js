import axios from 'axios'

export default form => {
  axios.get('/api/user/login', {
    username: form.username,
    password: form.password
  })
  .then(result => Promise.resolve(), msg => Promise.reject(msg))
}
