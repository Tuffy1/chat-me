<template>
  <div class="chat-now">
    <side-bar-inner>
      <template slot="item-list">
        <side-bar-inner-item  v-for="(user, index) in chatNow"
                              :key="index"
                              :goto="`/center/chatting/detail?user=${user._id}`">
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
