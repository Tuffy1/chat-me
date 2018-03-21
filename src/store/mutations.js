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
  removeChat (state, userRemove) {
    state.chatNow.forEach((user, index) => {
      if (user._id === userRemove._id) {
        state.chatNow.splice(index, 1)
      }
    })
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
    let usersFriend = state.friends
    usersFriend.forEach((friend, index) => {
      if (friend._id === user._id) {
        usersFriend.splice(index, 1)
      }
    })
    Vue.set(state, 'friends', usersFriend)
    let usersChatNow = state.chatNow
    usersChatNow.forEach((chatNow, index) => {
      if (chatNow._id === user._id) {
        usersChatNow.splice(index, 1)
      }
    })
    Vue.set(state, 'chatNow', usersChatNow)
  },
  setGroups (state, groups) {
    Vue.set(state, 'groups', groups)
  },
  newGroup (state, group) {
    let list = state.groups
    list.push(group)
    Vue.set(state, 'groups', list)
  },
  deleteGroup (state, user) {
    let usersGroup = state.groups
    usersGroup.forEach((group, index) => {
      if (group._id === user._id) {
        usersGroup.splice(index, 1)
      }
    })
    Vue.set(state, 'groups', usersGroup)
    let usersChatNow = state.chatNow
    usersChatNow.forEach((chatNow, index) => {
      if (chatNow._id === user._id) {
        usersChatNow.splice(index, 1)
      }
    })
    Vue.set(state, 'chatNow', usersChatNow)
  },
  getUserMessage (state, messages) {
    Vue.set(state, 'userMessage', messages)
  },
  getGroupMessage (state, messages) {
    Vue.set(state, 'groupMessage', messages)
  },
  sendMessage (state, msg) {
    let message = state.userMessage
    message.push(msg)
    Vue.set(state, 'userMessage', message)
  },
  SOCKET_USER_MESSAGE: (state, form) => {
    let message = state.userMessage
    message = message.concat(form[0].msg)
    Vue.set(state, 'userMessage', message)
    let chatNows = state.chatNow
    if (!chatNows.some(user => user._id === form[0].user._id)) {
      chatNows = chatNows.concat(form[0].user)
    }
    Vue.set(state, 'chatNow', chatNows)
  },
  SOCKET_GROUP_MESSAGE: (state, form) => {
    let message = state.groupMessage
    message = message.concat(form[0].msg)
    Vue.set(state, 'groupMessage', message)
    let chatNows = state.chatNow
    if (!chatNows.some(group => group._id === form[0].group._id)) {
      chatNows = chatNows.concat(form[0].group)
    }
    Vue.set(state, 'chatNow', chatNows)
  },
  setUserInfo (state, form) {
    let user = state.user
    user.nickname = form.username
    user.email = form.email
    user.introduce = form.introduce
    Vue.set(state, 'user', user)
  }
}
