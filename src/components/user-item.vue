<template>
  <div class="user-item">
    <div class="img-wrap">
      <img src="../assets/imgs/avatar.jpg" alt="">
    </div>
    <div class="user-info">
      <p>nickname</p>
      <p>content</p>
    </div>
    <div class="time">
      <span>02.05</span>
    </div>
  </div>
</template>

<script>

export default {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user-item {
  width: 200px;
  height: 40px;
  display: flex;
}
.user-item .img-wrap {
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 10px;
}
.user-item .img-wrap img{
  width: 40px;
  height: 40px;
}
.user-info {
  width: 120px;
  height: 40px;
  line-height: 1.2;
  padding-left: 10px;
  text-align: left;
}
.time {
  width: 40px;
  font-size: 12px;
  line-height: 1.2;
}
</style>
