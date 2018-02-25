import Vue from 'vue'

export default {
  loginInit (state) {
    Vue.set(state, 'loginState', true)
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
  deleteFriend (state, user) {
    let users = state.friends
    users.pop(user)
    Vue.set(state, 'friends', users)
  }
}
