<template>
<div>
  <div class="side-bar-inner" v-if="obj === 'user'">
    <div class="search">
      <Input v-model="searchContent"
             icon="ios-search"
             size="small"
             placeholder="Enter something..."
             class="search-input"
           >
      </Input>
    </div>
    <slot name="item-list"></slot>
  </div>

  <div class="side-bar-inner-setting" v-if="obj === 'setting'">
    <p class="user-setting">账户设置</p>
    <slot name="item-list"></slot>
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchContent: ''
    }
  },
  props: {
    obj: {
      type: String,
      defalut: 'user'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.side-bar-inner {
  width: 171px;
  height: 500px;
  border-right: 1px solid rgb(185, 182, 182);
}
.side-bar-inner .search {
  width: 171px;
  height: 50px;
  border-bottom: 1px solid rgb(185, 182, 182);
  margin-bottom: 10px;
}
.side-bar-inner .search .search-input {
   width: 150px;
   margin: 14px 5px;
}
.side-bar-inner-setting {
  width: 151px;
  height: 500px;
  border-right: 1px solid rgb(185, 182, 182);
  text-align: left;
}
.side-bar-inner-setting .user-setting {
  font-size: 20px;
  padding: 15px 0 15px 15px;
}
</style>
