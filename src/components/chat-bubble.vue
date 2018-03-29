<template>
  <div class="chat-bubble" :class="isMe ? 'right' : 'left'">
    <div class="avatar-wrap">
      <img src="../assets/imgs/avatar.jpg" alt="avatar">
    </div>
    <div class="talk-wrap">
      <div class="talk-bubble" v-if="message.type === 'text'">{{contentTransfer}}</div>
      <div class="img-wrap" v-else>
        <img :src="message.content" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import textTransfer from '../assets/js/text-transfer'

export default {
  computed: {
    contentTransfer () {
      return textTransfer(this.message.content)
    }
  },
  props: {
    isMe: {
      type: Boolean,
      required: true
    },
    message: {
      type: Object
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chat-bubble {
  display: flex;
  margin-bottom: 12px;
}
.chat-bubble .avatar-wrap {
  width: 30px;
  height: 30px;
  margin: 0 12px;
}
.chat-bubble .avatar-wrap img {
  width: 30px;
  height: 30px;
}
.chat-bubble .talk-wrap {
  flex: 0 0 auto;
}
.chat-bubble .talk-wrap .talk-bubble {
  text-align: left;
  background-color: antiquewhite;
  border-radius: 5px;
  font-size: 14px;
  max-width: 300px;
  word-wrap: break-word;
  position: relative;
  padding: 5px;
}
.left {
  justify-content: flex-start;
}
.right {
  justify-content: flex-end;
}
.left>.avatar-wrap {
  order: 0;
}
.left>.talk-wrap {
  order: 1;
}
.right>.avatar-wrap {
  order: 1;
}
.right>.talk-wrap {
  order: 0;
}
.chat-bubble .talk-wrap .talk-bubble::before {
  border: 6px solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  top: 6px;
}
.chat-bubble.right .talk-wrap .talk-bubble::before {
  border-left-color: antiquewhite;
  right: -12px;
}
.chat-bubble.left .talk-wrap .talk-bubble::before {
  border-right-color: antiquewhite;
  left: -12px;
}
.img-wrap img {
  width: 120px;
  height: auto;
}
</style>
