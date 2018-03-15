<template>
  <div class="chat-now">
    <group-layout :userChatTo="groupChatTo">
      <template slot="chat-group">
        <p>nickname: {{groupChatTo.nickname}}</p>
        <p>introduce: {{groupChatTo.introduce}}</p>
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
      groupChatTo: {}
    }
  },
  computed: {
    ...mapState(['groups'])
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
      this.groupId = this.$route.query.group
      this.groups.forEach(group => {
        if (group._id.toString() === this.groupId) {
          this.groupChatTo = group
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
