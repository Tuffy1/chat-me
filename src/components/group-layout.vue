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
      <Button type="error">删除</Button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['chatNow'])
  },
  props: ['userId'],
  methods: {
    joinChat () {
      if (!this.chatNow.some(user => user._id === this.userId)) {
        
      }
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
