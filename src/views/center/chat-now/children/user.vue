<template>
  <div class="chat-now">
    <chat-layout :userChatTo="userChatTo">
      <template slot="chat-content">
        <div v-for="(message, index) in messagesFilter" :key="index">
          <chat-bubble :isMe="message.from=== user._id"
                       :message="message">
          </chat-bubble>
        </div>
      </template>
    </chat-layout>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import chatLayout from '../../../../components/chat-layout'
import chatBubble from '../../../../components/chat-bubble'

export default {
  data () {
    return {
      userId: '',
      userChatTo: {
        _id: '',
        type: 'user'
      }
    }
  },
  computed: {
    ...mapState(['user', 'chatNow', 'userMessage']),
    messagesFilter () {
      return this.userMessage.filter((message) => {
        return ((message.from === this.userId) || (message.to === this.userId))
      })
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
      this.userId = this.$route.query.user
      this.chatNow.forEach(user => {
        if (user._id === this.userId) {
          this.userChatTo._id = user._id
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
