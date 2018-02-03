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
  width: 60px;
  height: 650px;
  background-color: rgb(6, 103, 160);
}
</style>
