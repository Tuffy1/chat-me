<template>
  <div class="chat-now">
    <chat-layout :userChatTo="userChatTo">
      <template slot="chat-content">
        <div v-for="(message, index) in groupMessage" :key="index">
          <chat-bubble :isMe="message.from=== user._id"
                       :message="message"
                       :userOrGroup="'group'">
          </chat-bubble>
        </div>
      </template>
    </chat-layout>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import { mapState } from 'vuex'

import chatLayout from '../../../../components/chat-layout'
import chatBubble from '../../../../components/chat-bubble'

export default {
  data () {
    return {
      userId: '',
      userChatTo: {
        _id: '',
        type: 'group'
      }
    }
  },
  computed: {
    ...mapState(['user', 'chatNow', 'groupMessage'])
    // messagesFilter () {
    //   return this.groupMessage.filter((message) => {
    //     return ((message.from === this.userId) || (message.to === this.userId))
    //   })
    // }
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
      if (this.userId) {
        this.chatNow.forEach(user => {
          if (user._id === this.userId) {
            // this.userChatTo._id = user._id
            this.userChatTo = cloneDeep(user)
          }
        })
        this.$store.dispatch('getGroupMessage', this.userId)
        .then(() => {}, msg => this.$Message.warning(msg))
      }
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
