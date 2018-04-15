<template>
  <div>
    <div class="side-bar-inner-item" @click="jumpTo" v-if="obj==='user'">
      <slot class="wrap"></slot>
    </div>
    <div class="side-bar-inner-item-setting" @click="jumpTo" v-if="obj==='setting'">
      <slot class="wrap"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goto: {
      type: String,
      default: '/center/chatting'
    },
    obj: {
      type: String,
      default: 'user'
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
  width: 170px;
  height: 50px;
  padding: 5px;
  position: relative;
  background-color: #eae9ea;
}
.side-bar-inner-item:hover,
.side-bar-inner-item:focus {
  cursor: pointer;
  background-color: #e4e4e4f2;
}
.side-bar-inner-item:isactive,
.side-bar-inner-item:active {
  background-color: #e4e4e4f2;
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

.side-bar-inner-item-setting {
  width: 150px;
  height: 30px;
  padding: 6px;
  position: relative;
  padding-left: 15px;
  text-align: left;
}
.side-bar-inner-item-setting:hover,
.side-bar-inner-item-setting:focus {
  cursor: pointer;
  background-color: #e4e4e4f2;
}
.side-bar-inner-item-setting:isactive,
.side-bar-inner-item-setting:active {
  background-color: #e4e4e4f2;
}
</style>
