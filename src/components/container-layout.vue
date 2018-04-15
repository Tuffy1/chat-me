<template>
  <div class="container-layout">
    <slot></slot>
  </div>
</template>

<script>
export default {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container-layout {
  display: flex;
  width: 800px;
  height: 501px;
  margin: 30px auto;
  /* border: 1px solid rgb(185, 182, 182); */
  background-color: #fdfdfde6;
  border-radius: 10px;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.25);
}
</style>
