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
      default: './center'
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
  width: 60px;
  height: 60px;
  padding: 10px;
  position: relative;
}
.side-bar-item:hover,
.side-bar-item:focus {
  background-color: rgb(24, 110, 160);
  cursor: pointer;
}
.side-bar-item:isactive,
.side-bar-item:active {
  background-color: rgb(24, 110, 160);
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
.avatar {
  border-radius: 50%;
}
.icon {
  display: block;
}
</style>
