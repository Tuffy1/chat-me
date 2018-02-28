import register from '../api/register'
import login from '../api/login'
import userSearch from '../api/user-search'
import addChatNow from '../api/add-chat-now'

export default {
  register: ({commit}, form) => {
    return register(form)
    .then(result => {
      commit('loginInit')
      Promise.resolve()
    }, msg => Promise.reject(msg))
  },
  login: ({commit}, form) => {
    return login(form)
    .then(result => {
      commit('loginInit')
      Promise.resolve()
    }, msg => Promise.reject(msg))
  },
  userSearch: (context, form) => {
    return userSearch(form)
    .then(result => Promise.resolve(result), msg => Promise.reject(msg))
  },
  addChatNow: ({commit}, userChatTo) => {
    return addChatNow(userChatTo)
    .then(() => {
      commit('addChatNow', userChatTo)
      Promise.resolve()
    }, msg => Promise.reject())
  }
}
