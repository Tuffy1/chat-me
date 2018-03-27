import authRe from '../api/auth-re'
import authDel from '../api/auth-del'
import register from '../api/register'
import login from '../api/login'
import userSearch from '../api/user-search'
import getUserInfo from '../api/get-user-info'
import getChatNow from '../api/get-chat-now'
import addChatNow from '../api/add-chat-now'
import removeChat from '../api/remove-chat'
import getFriends from '../api/get-friends'
import newFriend from '../api/new-friend'
import deleteFriend from '../api/delete-friend'
import getGroups from '../api/get-groups'
import newGroup from '../api/new-group'
import deleteGroup from '../api/delete-group'
import getUserMessage from '../api/get-user-message'
import getGroupMessage from '../api/get-group-message'
import showInfo from '../api/show-info'
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
      return Promise.resolve(result)
    }, msg => Promise.reject(msg))
  },
  login: ({commit}, form) => {
    return login(form).then(result => {
      commit('loginInit')
      return Promise.resolve(result)
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
      return Promise.resolve()
    }, msg => Promise.reject(msg))
  },
  removeChat: ({commit}, userRemove) => {
    return removeChat(userRemove)
    .then(() => {
      commit('removeChat', userRemove)
      return Promise.resolve()
    }, msg => Promise.reject(msg))
  },
  getFriends: ({commit}, context) => {
    return getFriends()
    .then(result => {
      commit('setFriends', result)
    }, msg => Promise.reject(msg))
  },
  newFriend: ({commit}, form) => {
    return newFriend(form)
    .then(() => {
      // commit('newFriend', user)
      return Promise.resolve()
    }, msg => Promise.reject(msg))
  },
  deleteFriend: ({commit}, user) => {
    return deleteFriend({
      _id: user._id
    })
    .then(() => {
      commit('deleteFriend', user)
      return Promise.resolve()
    }, msg => Promise.reject(msg))
  },
  getGroups: ({commit}, context) => {
    return getGroups()
    .then(result => {
      commit('setGroups', result)
      return Promise.resolve(result)
    }, msg => Promise.reject(msg))
  },
  newGroup: ({commit}, form) => {
    return newGroup({
      nickname: form.nickname,
      username: form.username,
      introduce: form.introduce,
      members: form.members
    })
    .then((result) => {
      commit('newGroup', result)
    }, msg => Promise.reject(msg))
  },
  deleteGroup: ({commit}, group) => {
    deleteGroup({
      _id: group._id
    })
    .then(() => {
      commit('deleteGroup', group)
      return Promise.resolve()
    }, msg => Promise.reject(msg))
  },
  getUserMessage: ({commit}) => {
    return getUserMessage()
    .then((result) => {
      commit('getUserMessage', result)
      return Promise.resolve(result)
    }, msg => Promise.reject(msg))
  },
  getGroupMessage: ({commit}, groupId) => {
    return getGroupMessage(groupId)
    .then((result) => {
      commit('getGroupMessage', result)
      return Promise.resolve(result)
    }, msg => Promise.reject(msg))
  },
  sendMessage: ({commit}, form) => {
    return sendMessage(form)
    .then((result) => {
      commit('sendMessage', result)
      return Promise.resolve(result)
    }, msg => Promise.reject(msg))
  },
  showInfo: (context, form) => {
    return showInfo(form)
    .then((result) => Promise.resolve(result), msg => Promise.reject(msg))
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
