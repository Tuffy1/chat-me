// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import socketio from 'socket.io-client'
import VueSocketio from 'vue-socket.io'
import 'iview/dist/styles/iview.css'
// import { Socket } from 'net';

Vue.config.productionTip = false

Vue.use(iView)
Vue.use(Vuex)
Vue.use(VueSocketio, socketio('http://localhost:8088'), store)
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  sockets: {
    connect: () => {
      console.log('socket connected')
    },
    customEmit: (val) => {
      console.log('this.method was fired by the socket server.')
    }
  }
})
