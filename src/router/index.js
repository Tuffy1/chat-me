import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Register from '@/views/register'
import Center from '@/views/center/index'
import chatNow from '@/views/center/chat-now/index'
import userChatNowDetail from '@/views/center/chat-now/children/user'
import groupChatNowDetail from '@/views/center/chat-now/children/group'
import groupChat from '@/views/center/group-chat/index'
import userChatDetail from '@/views/center/group-chat/children/user'
import groupChatDetail from '@/views/center/group-chat/children/group'
import Setting from '@/views/center/setting/index'
import overview from '@/views/center/setting/overview'
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
              path: '/center/chatting/userdetail',
              name: 'userChattingDetail',
              component: userChatNowDetail
            },
            {
              path: '/center/chatting/groupdetail',
              name: 'groupChattingDetail',
              component: groupChatNowDetail
            }
          ]
        },
        {
          path: '/center/groupchat',
          name: 'GroupChat',
          component: groupChat,
          children: [
            {
              path: '/center/groupchat/userdetail',
              name: 'userChatDetail',
              component: userChatDetail
            },
            {
              path: '/center/groupchat/groupdetail',
              name: 'groupChatDetail',
              component: groupChatDetail
            }
          ]
        },
        {
          path: '/center/setting',
          name: 'Setting',
          component: Setting,
          redirect: '/center/setting/overview',
          children: [
            {
              path: '/center/setting/overview',
              name: 'overview',
              component: overview
            },
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
