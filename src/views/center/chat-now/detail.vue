<template>
  <div class="chat-now">
    <chat-layout></chat-layout>
  </div>
</template>

<script>
import chatLayout from '../../../components/chat-layout'

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
    chatLayout
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
