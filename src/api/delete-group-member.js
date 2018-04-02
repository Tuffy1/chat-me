import axios from 'axios'

export default form => {
  return axios.post('/api/user/deleteGroupMember', {
    groupId: form.groupId,
    memberId: form.memberId
  })
  .then(res => {
    if (res.data.success) {
      return Promise.resolve(res.data.result)
    }
    return Promise.reject(res.data.msg)
  }, () => Promise.reject(new Error('无法连接服务器')))
}
