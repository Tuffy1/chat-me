<template>
  <div class="overview"> 
    <div class="group-wrap">
      <div class="group-avatar">
        <img src="../../../assets/imgs/avatar.jpg" alt="">
      </div>
      <div class="group-info">
        <p>昵称: {{user.nickname}}</p>
        <p>用户名: {{user.username}}</p>
        <p>邮箱: {{user.email}}</p>
        <p>个人简介: {{user.introduce}}</p>
      </div>
    </div>  
    <div class="btn-wrap">
      <i-button type="error" @click="logout()">注销</i-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['user'])
  },
  methods: {
    logout () {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.overview {
  width: 577px;
  height: 499px;
  position: relative;
}
.overview .group-wrap {
  width: 100%;
  margin-bottom: 10px;
  text-align: left;
  padding: 14px 15px;
  font-size: 16px;
  display: flex;
}
.overview .group-wrap .group-avatar {
  width: 120px;
  height: 120px;
  overflow: hidden;
}
.overview .group-wrap .group-avatar img {
  width: 120px;
  height: 120px;
}
.overview .group-info {
  margin-left: 12px;
  overflow: hidden;
}
.overview .btn-wrap {
  width: 300px;
  margin: 50px auto;
}
.overview .btn-wrap button {
  margin: 10px 0;
  width: 100%;
}
</style>
