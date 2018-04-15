<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import store from './store/index.js'

export default {
  name: 'app',
  store
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.link-like {
  cursor: pointer;
}
.link-like:hover {
  color: rgb(126, 181, 212);
}
/* sidebar-inner 的 折叠列表 */
#group-chat .ivu-collapse {
  background-color: transparent;
  border: 0;
}
#group-chat .ivu-collapse>.ivu-collapse-item {
  border: 0;
}
#group-chat .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header {
  padding-left: 12px;
}
#group-chat .ivu-collapse-content {
  padding: 0;
}
#group-chat .ivu-collapse-content>.ivu-collapse-content-box {
  padding: 0;
}
#form .ivu-input {
  background-color: #ffffffeb;
}
#panel .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header {
  background-color: #eae9ea;
}
#panel .ivu-collapse-content {
  background-color: transparent;
}
</style>
