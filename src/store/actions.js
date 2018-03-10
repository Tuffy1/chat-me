import authRe from '../api/auth-re'
import authDel from '../api/auth-del'
import register from '../api/register'
import login from '../api/login'
import userSearch from '../api/user-search'
import getUserInfo from '../api/get-user-info'
import getChatNow from '../api/get-chat-now'
import addChatNow from '../api/add-chat-now'
import getFriends from '../api/get-friends'
import newFriend from '../api/new-friend'
import sendMessage from '../api/send-message'
import setUserInfo from '../api/set-user-info'
import setUserPassword from '../api/set-user-password'

export default {
  socketLogin (context) {
    console.log('context')
  },
  authRe: (context, form) => {
    return authRe()
    .then(result => Promise.resolve(result), msg => Promise.reject(msg))
  },
  authDel: (context) => {
    return authDel()
    .then(result => Promise.resolve(result), msg => Promise.reject(msg))
  },
  register: ({commit}, form) => {
    return register(form)
    .then(result => {
      commit('loginInit')
      Promise.resolve(result)
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
  getUserInfo: ({commit}) => {
    return getUserInfo()
    .then(result => {
      commit('getUserInfo', result)
    }, msg => Promise.reject(msg))
  },
  getChatNow: ({commit}, context) => {
    return getChatNow()
    .then(result => {
      commit('setChatNow', result)
    }, msg => Promise.reject(msg))
  },
  addChatNow: ({commit}, userChatTo) => {
    return addChatNow(userChatTo)
    .then(() => {
      commit('addChatNow', userChatTo)
      Promise.resolve()
    }, msg => Promise.reject(msg))
  },
  getFriends: ({commit}, context) => {
    return getFriends()
    .then(result => {
      commit('setFriends', result)
    }, msg => Promise.reject(msg))
  },
  newFriend: ({commit}, user) => {
    return newFriend({
      _id: user._id,
      avatar: user.avatar,
      nickname: user.nickname,
      username: user.username,
      email: user.email,
      introduce: user.introduce,
      creatAt: user.creatAt
    })
    .then(() => {
      commit('newFriend', user)
    }, msg => Promise.reject(msg))
  },
  sendMessage: (context, form) => {
    return sendMessage(form)
    .then(result => Promise.resolve(result), msg => Promise.reject(msg))
  },
  setUserInfo: ({commit}, form) => {
    return setUserInfo(form)
    .then(() => {
      commit('setUserInfo', form)
    }, msg => Promise.reject(msg))
  },
  setUserPassword: (context, form) => {
    return setUserPassword(form)
    .then(() => Promise.resolve(), msg => Promise.reject(msg))
  }
}
