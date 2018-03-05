import Vue from 'vue'

export default {
  loginInit (state) {
    Vue.set(state, 'loginState', true)
  },
  getUserInfo (state, info) {
    Vue.set(state, 'user', info)
  },
  setChatNow (state, users) {
    Vue.set(state, 'chatNow', users)
  },
  addChatNow (state, user) {
    let users = state.chatNow
    users.unshift(user)
    Vue.set(state, 'chatNow', users)
  },
  deleteChatNow (state, user) {
    let users = state.chatNow
    users.shift(user)
    Vue.set(state, 'chatNow', users)
  },
  setFriends (state, users) {
    Vue.set(state, 'friends', users)
  },
  newFriend (state, user) {
    let users = state.friends
    users.push(user)
    Vue.set(state, 'friends', users)
  },
  deleteFriend (state, user) {
    let users = state.friends
    users.pop(user)
    Vue.set(state, 'friends', users)
  },
  setUserInfo (state, form) {
    let user = state.user
    user.nickname = form.username
    user.email = form.email
    user.introduce = form.introduce
    Vue.set(state, 'user', user)
  }
}
