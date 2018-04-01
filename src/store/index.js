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
    chatNow: [],
    userMessage: [],
    groupMessage: [],
    theGroup: {
      members: []
    },
    groupRole: {
      1: {
        text: 'owner'
      },
      2: {
        text: 'manager'
      },
      3: {
        text: 'member'
      }
    }
  },
  getters,
  mutations,
  actions
})
