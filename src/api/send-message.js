import axios from 'axios'

export default form => {
  return axios.post('/api/message/sendMessage', {
    chatTo: form.chatTo,
    content: form.content
  })
  .then((result) => Promise.resolve(result), msg => Promise.reject(msg))
}
