<template>
  <div class="chat-now">
    <side-bar-inner :obj="'user'">
      <template slot="search">
        <Input v-model="searchContent"
             icon="ios-search"
             size="small"
             placeholder="Enter something..."
             class="search-input"
           >
        </Input>
      </template>
      <template slot="item-list">
        <side-bar-inner-item  v-for="user in chatNowFilter"
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
  data () {
    return {
      searchContent: ''
    }
  },
  computed: {
    ...mapState(['chatNow']),
    chatNowFilter () {
      return this.chatNow.filter(user => user.nickname.match(this.searchContent))
    }
  },
  watch: {
    $route () {
      this.init()
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.$store.dispatch('getChatNow')
      .then(() => {}, msg => this.$Message.warning(msg))
    },
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
