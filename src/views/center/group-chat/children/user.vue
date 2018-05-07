<template>
  <div class="chat-now">
    <group-layout :userChatTo="userChatTo" :newFriend="false">
      <template slot="chat-user">
        <p><span class="label">昵称: </span>{{userChatTo.nickname}}</p>
        <p><span class="label">用户名: </span>{{userChatTo.username}}</p>
        <p><span class="label">简介: </span>{{userChatTo.introduce}}</p>
      </template>
    </group-layout>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import groupLayout from '../../../../components/group-layout'
import chatBubble from '../../../../components/chat-bubble'

export default {
  data () {
    return {
      userId: '',
      userChatTo: {
        type: 'user'
      }
    }
  },
  computed: {
    ...mapState(['friends'])
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
      this.userId = this.$route.query.user
      this.friends.forEach(friend => {
        if (friend._id.toString() === this.userId) {
          this.userChatTo = friend
          this.userChatTo.type = 'user'
        }
      })
    }
  },
  components: {
    groupLayout,
    chatBubble
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chat-now .label {
  display: inline-block;
  width: 60px;
}
</style>
