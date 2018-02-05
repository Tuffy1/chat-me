<template>
  <div class="chat-layout">
    <div class="chat-name">
      Joyee
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chat-layout {
  width: 667px;
  height: 651px;
}
.chat-layout .chat-name {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid rgb(185, 182, 182);
  margin-bottom: 10px;
  text-align: left;
  padding: 20px 15px;
  font-size: 16px;
}
</style>
