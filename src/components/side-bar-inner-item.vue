<template>
  <div class="side-bar-inner-item" @click="jumpTo">
    <slot class="wrap"></slot>
  </div>
</template>

<script>
export default {
  props: {
    goto: {
      type: String,
      default: '/center/chatting'
    }
  },
  methods: {
    jumpTo () {
      this.$router.push(this.goto)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.side-bar-inner-item {
  width: 220px;
  height: 60px;
  padding: 10px;
  position: relative;
}
.side-bar-inner-item:hover,
.side-bar-inner-item:focus {
  cursor: pointer;
  background-color: rgb(235, 233, 233);
}
.side-bar-inner-item:isactive,
.side-bar-inner-item:active {
  background-color: rgb(235, 233, 233);
}
.item-wrap {
  width: 40px;
  height: 40px;
  overflow: hidden;
}
.item-wrap .wrap {
  width: 40px;
  height: 40px;
}
</style>
