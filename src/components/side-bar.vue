<template>
  <div class="side-bar">
    <slot></slot>
  </div>
</template>

<script>

export default {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.side-bar {
  width: 50px;
  height: 501px;
  background-color: #2a2c2dc7;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
</style>
