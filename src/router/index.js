import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Register from '@/views/register'
import Center from '@/views/center/index'
import chatNow from '@/views/center/chat-now/index'
import chatNowDetail from '@/views/center/chat-now/detail'
import groupChat from '@/views/center/group-chat/index'
import groupChatDetail from '@/views/center/group-chat/detail'
import Setting from '@/views/center/setting/index'
import infoSetting from '@/views/center/setting/infoSetting'
import passwordSetting from '@/views/center/setting/passwordSetting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/center',
      name: 'Center',
      component: Center,
      redirect: '/center/chatting',
      children: [
        {
          path: '/center/chatting',
          name: 'Chatting',
          component: chatNow,
          children: [
            {
              path: '/center/chatting/detail',
              name: 'ChattingDetail',
              component: chatNowDetail
            }
          ]
        },
        {
          path: '/center/groupchat',
          name: 'GroupChat',
          component: groupChat,
          children: [
            {
              path: '/center/groupchat/detail',
              name: 'GroupChatDetail',
              component: groupChatDetail
            }
          ]
        },
        {
          path: '/center/setting',
          name: 'Setting',
          component: Setting,
          children: [
            {
              path: '/center/setting/infoSetting',
              name: 'infoSetting',
              component: infoSetting
            },
            {
              path: '/center/setting/passwordSetting',
              name: 'passwordSetting',
              component: passwordSetting
            }
          ]
        }
      ]
    }
  ]
})
