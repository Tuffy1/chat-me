<template>
  <div class="chat-now">
    <side-bar-inner :obj="'user'">
      <template slot="item-list">
        <side-bar-inner-item  v-for="user in chatNow"
                              :key="user._id"
                              :goto=route(user)>
          <user-item :user="user"></user-item>
        </side-bar-inner-item>
      </template>
    </side-bar-inner>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import sideBarInner from '../../../components/side-bar-inner'
import sideBarInnerItem from '../../../components/side-bar-inner-item'
import userItem from '../../../components/user-item'

export default {
  computed: {
    ...mapState(['chatNow'])
  },
  methods: {
    route (user) {
      if (user.type === 'group') {
        return `/center/chatting/groupdetail?user=${user._id}`
      } else {
        return `/center/chatting/userdetail?user=${user._id}`
      }
    }
  },
  components: {
    sideBarInner,
    sideBarInnerItem,
    userItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chat-now {
  display: flex;
}
</style>
