<template>
  <div class="user-item">
    <div class="img-wrap">
      <i>
        <Icon type="plus" class="icon-plus"></Icon>
      </i>
    </div>
    <div class="user-info">
      <p class="info">{{user.nickname}}</p>
      <p class="info">请求加为好友</p>
    </div>
    <div class="time">
    </div>
  </div>
</template>

<script>

export default {
  props: ['user']
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
.user-item .img-wrap i{
  width: 30px;
  height: 30px;
  padding: 9px 5px;
}
.icon-plus {
  width: 20px;
  height: 20px;
  
}
.user-info {
  width: 100px;
  height: 30px;
  line-height: 1.2;
  padding-left: 6px;
  text-align: left;
}
.info {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.time {
  width: 30px;
  font-size: 12px;
  line-height: 1.2;
}
</style>
