<template>
  <div class="chat-now">
    <chat-layout :userChatTo="userChatTo">
      <template slot="chat-content">
        <div v-for="(message, index) in userMessage" :key="index">
          <chat-bubble :isMe="message.from._id === user._id"
                       :content="message.content">
          </chat-bubble>
        </div>
      </template>
    </chat-layout>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import chatLayout from '../../../components/chat-layout'
import chatBubble from '../../../components/chat-bubble'

export default {
  data () {
    return {
      userId: '',
      userChatTo: {}
    }
  },
  computed: {
    ...mapState(['user', 'friends', 'groups', 'userMessage'])
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
        if (friend._id === this.userId) {
          this.userChatTo = friend
        }
      })
    }
  },
  components: {
    chatLayout,
    chatBubble
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
