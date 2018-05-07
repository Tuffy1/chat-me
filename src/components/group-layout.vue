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
    <div class="btn-wrap" v-if="!newFriend">
      <Button type="success" @click="joinChat">聊天</Button>
      <Button type="error" @click="deleteFriend" v-if="this.userChatTo.type === 'user'">删除</Button>
    </div>
    <div class="btn-wrap" v-else>
      <Button type="success" @click="friendConfirm">同意</Button>
      <Button type="error" @click="deleteConfirm">删除</Button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['user', 'chatNow', 'friends'])
  },
  props: ['userChatTo', 'newFriend'],
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
      } else {
        if (this.userChatTo.type === 'group') {
          this.$router.push(`/center/chatting/groupdetail?user=${this.userChatTo._id}`)
        } else {
          this.$router.push(`/center/chatting/userdetail?user=${this.userChatTo._id}`)
        }
      }
    },
    deleteFriend () {
      this.$store.dispatch('deleteFriend', this.userChatTo)
      .then(() => this.$Message.success('删除成功'), msg => this.$Message.warning(msg))
    },
    deleteGroup () {
      this.$store.dispatch('deleteGroup', this.userChatTo)
      .then(() => this.$Message.success('退出成功'), msg => this.$Message.warning(msg))
    },
    friendConfirm () {
      let me = {
        _id: this.user._id,
        avatar: this.user.avatar,
        nickname: this.user.nickname,
        username: this.user.username,
        email: this.user.email,
        introduce: this.user.introduce,
        creatAt: this.user.creatAt,
        relat: true
      }
      this.$store.dispatch('friendConfirm', {
        from: me,
        to: this.userChatTo
      })
      .then(() => {
        this.$store.commit('friendConfirm', this.userChatTo)
        this.$Message.success('添加成功')
      }, msg => this.$Message.warning(msg))
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
}
.group-layout .group-wrap .group-avatar img {
  width: 120px;
  height: 120px;
}
.group-layout .group-info {
  margin-left: 12px;
  margin-top: 5px;
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
