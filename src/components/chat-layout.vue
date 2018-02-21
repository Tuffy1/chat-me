<template>
  <div class="chat-layout">
    <div class="chat-name">
      Joyee
    </div>
    <div class="chat-content">
      <slot name="chat-content"></slot>
    </div>
    <div class="chat-text">
      <textarea name="" id=""></textarea>
    </div>
  </div>
</template>

<script>
export default {
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
}
.chat-layout .chat-content {
  padding: 10px 10px;
}
.chat-layout .chat-text {
  border-top: 1px solid rgb(185, 182, 182);
  width: 100%;
  height: 100px;
  padding-top: 5px;
  position: absolute;
  left: 0;
  bottom: 0;
  overflow: hidden;
}
.chat-layout .chat-text textarea {
  width: 587px;
  height: 100%;
  resize: none;
  border: 0;
  outline: none;
  padding: 0 15px 5px 5px;
}
</style>
