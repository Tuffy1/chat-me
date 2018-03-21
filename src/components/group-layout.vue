<template>
  <div class="group-layout">
    <div class="group-wrap">
      <div class="group-avatar">
        <img src="../assets/imgs/avatar.jpg" alt="">
      </div>
      <div class="group-info">
        <slot name="chat-user"></slot>
      </div>
      <div class="group-info">
        <slot name="chat-group"></slot>
      </div>
    </div>  
    <div class="btn-wrap">
      <Button type="success" @click="joinChat">聊天</Button>
      <Button type="error" @click="deleteGroup" v-if="this.userChatTo.type === 'group'">退出群聊</Button>
      <Button type="error" @click="deleteFriend" v-else>删除</Button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['chatNow', 'friends'])
  },
  props: ['userChatTo'],
  methods: {
    joinChat () {
      if (!this.chatNow.some(user => user._id === this.userChatTo._id)) {
        this.$store.dispatch('addChatNow', this.userChatTo)
        .then(() => {
          if (this.userChatTo.type === 'group') {
            this.$router.push(`/center/chatting/groupdetail?user=${this.userChatTo._id}`)
          } else {
            this.$router.push(`/center/chatting/userdetail?user=${this.userChatTo._id}`)
          }
        }, msg => this.$Message.warning(msg))
      }
    },
    deleteFriend () {
      this.$store.dispatch('deleteFriend', this.userChatTo)
      .then(() => this.$Message.success('删除成功'), msg => this.$Message.warning(msg))
    },
    deleteGroup () {
      this.$store.dispatch('deleteGroup', this.userChatTo)
      .then(() => this.$Message.success('退出成功'), msg => this.$Message.warning(msg))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.group-layout {
  width: 577px;
  height: 499px;
  position: relative;
}
.group-layout .group-wrap {
  width: 100%;
  margin-bottom: 10px;
  text-align: left;
  padding: 14px 15px;
  font-size: 16px;
  display: flex;
}
.group-layout .group-wrap .group-avatar {
  width: 120px;
  height: 120px;
  overflow: hidden;
}
.group-layout .group-wrap .group-avatar img {
  width: 120px;
  height: 120px;
}
.group-layout .group-info {
  margin-left: 12px;
  overflow: hidden;
}
.group-layout .btn-wrap {
  width: 300px;
  margin: 50px auto;
}
.group-layout .btn-wrap button {
  margin: 10px 0;
  width: 100%;
}
</style>
