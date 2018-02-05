<template>
  <div class="chat-bubble" :class="isMe ? right : left">
    <div class="avatar-wrap">
      <img src="../assets/imgs/avatar.jpg" alt="avatar">
    </div>
    <div class="talk-wrap">
      <div class="talk-bubble">123231231323</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isMe: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chat-bubble {
  display: flex;
}
.chat-bubble .avatar-wrap {
  width: 40px;
  height: 40px;
}
.chat-bubble .avatar-wrap img {
  width: 40px;
  height: 40px;
}
.chat-bubble .talk-wrap .talk-bubble {
  background-color: antiquewhite;
  border-radius: 3px;
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
</style>
