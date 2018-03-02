<template>
  <container-layout>
    <side-bar>
      <side-bar-item type="avatar" goto="/center">
        <img slot="avatar" src="../../assets/imgs/avatar.jpg" alt="avatar" ref="img" @error="showDefaultAvatar">
      </side-bar-item>
      <side-bar-item type="icon" goto="/center/chatting">
        <Icon slot="icon" type="chatbubble" class="side-icon" size="25"></Icon>
      </side-bar-item>
      <side-bar-item type="icon" goto="/center/groupchat">
        <Icon slot="icon" type="person-stalker" class="side-icon" size="25"></Icon>
      </side-bar-item>
      <side-bar-item type="icon" goto="/center/setting">
        <Icon slot="icon" type="android-settings" class="side-icon" size="25"></Icon>
      </side-bar-item>
    </side-bar>
    <router-view></router-view>
  </container-layout>
</template>

<script>
import { mapGetters } from 'vuex'

import containerLayout from '../../components/container-layout'
import sideBar from '../../components/side-bar'
import sideBarItem from '../../components/side-bar-item'
import contentLayout from '../../components/content-layout'
import sideBarInner from '../../components/side-bar-inner'

const defaultAvatar = require('../../assets/imgs/avatar.jpg')

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters(['loginState'])
  },
  created () {
    this.init()
  },
  methods: {
    showDefaultAvatar () {
      if (this.$refs.img) {
        this.$refs.img.src = defaultAvatar
      }
    },
    init () {
      this.$store.dispatch('geuUserInfo')
      .then(() => {}, msg => this.$Message.warning(msg))
      this.$store.dispatch('getChatNow')
      .then(() => {}, msg => this.$Message.warning(msg))
      this.$store.dispatch('getFriends')
      .then(() => {}, msg => this.$Message.warning(msg))
    }
    // login () {
    //   this.$store.dispatch('login', {
    //     username: this.username,
    //     password: this.password
    //   })
    //   .then(() => {
    //     console.log(`loginState:${this.loginState}`)
    //   }, (msg) => Promise.reject(msg))
      // this.$http.post('/api/login', {
      //   username: this.username,
      //   password: this.password
      // })
      // .then(result => Promise.resolve(), msg => Promise.reject(msg))
    // }
  },
  components: {
    containerLayout,
    sideBar,
    sideBarItem,
    contentLayout,
    sideBarInner
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  width: 35px;
  height: 35px;
}
.side-icon {
  color: rgb(126, 181, 212);
  margin: 4px 4px 0 0;
}
</style>
