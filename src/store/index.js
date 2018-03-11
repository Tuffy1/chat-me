import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginState: false,
    user: {
      nickname: 'joyee',
      username: 'joyee',
      email: 'joyee@qq.com',
      introduce: 'i am joyee'
    },
    friends: [],
    groups: [],
    chatNow: [
      {
        nickname: 'tuffy',
        username: 'tuffy',
        email: '123@qq.com',
        introduce: 'i am tuffy'
      }
    ],
    userMessage: []
  },
  getters,
  mutations,
  actions
})
