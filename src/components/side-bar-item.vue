<template>
  <div class="side-bar-item" @click="jumpTo">
    <div class="item-wrap avatar" v-if="type === 'avatar'">
      <slot class="wrap" name="avatar"></slot>
    </div>
    <div class="item-wrap icon" v-if="type === 'icon'">
      <slot class="wrap" name="icon"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'icon'
    },
    goto: {
      type: String,
      default: '/center'
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
.side-bar-item {
  width: 50px;
  height: 50px;
  padding: 10px;
  position: relative;
}
.side-bar-item:hover,
.side-bar-item:focus {
  background-color: #6f6f6bd1;
  cursor: pointer;
}
.side-bar-item:isactive,
.side-bar-item:active {
  background-color: #6f6f6bd1;
}
.item-wrap {
  width: 35px;
  height: 35px;
  overflow: hidden;
}
.item-wrap .wrap {
  width: 35px;
  height: 35px;
}
.avatar {
  border-radius: 50%;
  margin-left: -3px;
  margin-top: -3px;
}
.icon {
  display: block;
}
</style>
