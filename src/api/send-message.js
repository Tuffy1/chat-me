import axios from 'axios'

export default form => {
  return axios.post('/api/message/sendMessage', {
    chatTo: form.chatTo,
    content: form.content
  })
  .then(res => Promise.resolve(res.data.result), msg => Promise.reject(msg))
}
