<template>
  <div class="chat-now">
    <chat-layout>
      <template slot="chat-content">
        <chat-bubble :isMe="false"></chat-bubble>
        <chat-bubble :isMe="true"></chat-bubble>
      </template>
    </chat-layout>
  </div>
</template>

<script>
import chatLayout from '../../../components/chat-layout'
import chatBubble from '../../../components/chat-bubble'

export default {
  data () {
    return {
      userId: ''
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
