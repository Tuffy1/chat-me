<template>
  <div class="chat-layout">
    <div class="chat-name">
      {{userChatTo.nickname}}
      <span class="icon-person link-like" @click="showInfo">
        <Icon type="person"></Icon>
      </span>
      <span class="icon-close link-like">
        <Icon type="close-round"></Icon>
      </span>
    </div>
    <div class="chat-content" id="chatContent">
      <slot name="chat-content"></slot>
    </div>
    <div class="chat-text">
      <textarea name="" id="" v-model="message"></textarea>
      <Button type="success" size="small" class="send-btn" @click="onSubmit()">发送</Button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: '',
      userInfo: ''
    }
  },
  props: ['userChatTo', 'userMessage'],
  // watch: {
  //   userMessage () {
  //     this.$nextTick(() => {
  //       const container = document.getElementById("chatContent")
  //       container.scrollTop = container.scrollHeight
  //     })
  //   }
  // },
  // created() {
  //   this.$nextTick(() => {
  //     const container = document.getElementById("chatContent")
  //     container.scrollTop = container.scrollHeight
  //   })
  // },
  methods: {
    showInfo () {
      this.$store.dispatch('showInfo', this.userChatTo)
      .then((result) => {
        this.userInfo = result
      }, msg => this.$Message.warning(msg))
    },
    onSubmit () {
      this.$store.dispatch('sendMessage', {
        chatTo: this.userChatTo._id,
        content: this.message,
        type: this.userChatTo.type
      })
      .then(() => {
        this.message = ''
      }, msg => this.$Message.warning(msg))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chat-layout {
  width: 577px;
  height: 499px;
  position: relative;
}
.chat-layout .chat-name {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid rgb(185, 182, 182);
  margin-bottom: 10px;
  text-align: left;
  padding: 14px 15px;
  font-size: 16px;
  position: relative;
}
.chat-layout .icon-person {
  position: absolute;
  right: 55px;
}
.chat-layout .icon-close {
  position: absolute;
  right: 25px;
}
.chat-layout .chat-content {
  padding: 10px 10px;
  height: 327px;
  overflow-y: scroll;
}
.chat-layout .chat-text {
  border-top: 1px solid rgb(185, 182, 182);
  width: 100%;
  height: 110px;
  padding-top: 5px;
  position: absolute;
  left: 0;
  bottom: 0;
  overflow: hidden;
  text-align: left;
}
.chat-layout .chat-text textarea {
  width: 587px;
  height: 74px;
  resize: none;
  border: 0;
  outline: none;
  padding: 0 15px 5px 5px;
}
.chat-layout .chat-text .send-btn {
  margin-right: 5px;
}
</style>
