<template>
  <div class="chat-now">
    <group-layout :userChatTo="userChatTo">
      <template slot="chat-user">
        <p>nickname: {{userChatTo.nickname}}</p>
        <p>email: {{userChatTo.email}}</p>
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
      userChatTo: {}
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
</style>
