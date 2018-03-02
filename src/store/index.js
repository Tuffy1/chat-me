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
      _id: '123',
      nickname: 'joyee',
      username: 'joyee',
      email: '123@qq.com',
      introduce: 'i am joyee'
    },
    friends: [
      {
        _id: '123',
        nickname: 'joyee',
        username: 'joyee',
        email: '123@qq.com',
        introduce: 'i am joyee'
      },
      {
        _id: '124',
        nickname: 'tuffy',
        username: 'tuffy',
        email: '124@qq.com',
        introduce: 'i am tuffy'
      },
      {
        _id: '125',
        nickname: 'zerdon',
        username: 'zerdon',
        email: '125@qq.com',
        introduce: 'i am zerdon'
      },
      {
        _id: '126',
        nickname: 'kurisu',
        username: 'kurisu',
        email: '126@qq.com',
        introduce: 'i am kurisu'
      },
      {
        _id: '127',
        nickname: 'xiao',
        username: 'xiao',
        email: '127@qq.com',
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
        email: '123@qq.com',
        introduce: 'i am joyee'
      },
      {
        _id: '124',
        nickname: 'tuffy',
        username: 'tuffy',
        email: '124@qq.com',
        introduce: 'i am tuffy'
      }
    ],
    userMessage: [
      {
        from: {
          _id: '123',
          avatar: ''
        },
        to: {
          _id: '124',
          avatar: ''
        },
        type: 'text',
        content: 'happy~',
        isRead: false
      },
      {
        from: {
          _id: '124',
          avatar: ''
        },
        to: {
          _id: '123',
          avatar: ''
        },
        type: 'text',
        content: 'No',
        isRead: false
      }
    ]
  },
  getters,
  mutations,
  actions
})
