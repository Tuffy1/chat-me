<template>
  <div class="chat-now">
    <group-layout>
      <template slot="chat-user">
        <p>username: Joyee</p>
        <p>email: 704529989@qq.com</p>
      </template>
    </group-layout>
  </div>
</template>

<script>
import groupLayout from '../../../components/group-layout'
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
    groupLayout,
    chatBubble
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
