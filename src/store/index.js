import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginState: false,
    friends: [
      {
        _id: '123',
        nickname: 'joyee',
        username: 'joyee',
        introduce: 'i am joyee'
      },
      {
        _id: '124',
        nickname: 'tuffy',
        username: 'tuffy',
        introduce: 'i am tuffy'
      },
      {
        _id: '125',
        nickname: 'zerdon',
        username: 'zerdon',
        introduce: 'i am zerdon'
      },
      {
        _id: '126',
        nickname: 'kurisu',
        username: 'kurisu',
        introduce: 'i am kurisu'
      },
      {
        _id: '127',
        nickname: 'xiao',
        username: 'xiao',
        introduce: 'i am xiao'
      }
    ],
    groups: [
      {
        _id: '211',
        nickname: '421',
        username: '421',
        introduce: 'i am 421'
      },
      {
        _id: '212',
        nickname: 'qiaosen',
        username: 'qiaosen',
        introduce: 'i am qiaosen'
      }
    ],
    chatNow: [
      {
        _id: '123',
        nickname: 'joyee',
        username: 'joyee',
        introduce: 'i am joyee'
      },
      {
        _id: '124',
        nickname: 'tuffy',
        username: 'tuffy',
        introduce: 'i am tuffy'
      }
    ]
  },
  getters,
  mutations,
  actions
})
