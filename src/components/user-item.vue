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
  width: 165x;
  height: 40px;
  display: flex;
  padding: 5px 0;
}
.user-item .img-wrap {
  width: 30px;
  height: 30px;
  overflow: hidden;
  border-radius: 10px;
}
.user-item .img-wrap img{
  width: 30px;
  height: 30px;
}
.user-info {
  width: 100px;
  height: 30px;
  line-height: 1.2;
  padding-left: 6px;
  text-align: left;
}
.time {
  width: 30px;
  font-size: 12px;
  line-height: 1.2;
}
</style>
