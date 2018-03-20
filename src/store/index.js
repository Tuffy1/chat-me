import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginState: false,
    user: {},
    friends: [],
    groups: [],
    chatNow: [
      {
        nickname: 'tuffy',
        username: 'tuffy',
        introduce: 'i am tuffy'
      }
    ],
    userMessage: [],
    groupMessage: []
  },
  getters,
  mutations,
  actions
})
