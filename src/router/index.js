import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Register from '@/views/register'
import Center from '@/views/center/index'
import chatNow from '@/views/center/chat-now/index'
import chatNowDetail from '@/views/center/chat-now/detail'
import groupChat from '@/views/center/group-chat/index'
import groupChatDetail from '@/views/center/group-chat/detail'

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
        }
      ]
    }
  ]
})
