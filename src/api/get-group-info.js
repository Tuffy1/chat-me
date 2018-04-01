import axios from 'axios'

export default (groupId) => {
  return axios.get(`/api/user/groupInfo?groupId=${groupId}`)
  .then(res => {
    if (res.data.success) {
      return Promise.resolve(res.data.result)
    }
    return Promise.reject(res.data.msg)
  }, () => Promise.reject(new Error('无法连接服务器')))
}
