<template>
  <div class="side-bar-inner">
    <div class="search">
      <Input v-model="searchContent"
             icon="ios-search"
             placeholder="Enter something..."
             class="search-input"
           >
      </Input>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchContent: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.side-bar-inner {
  width: 220px;
  height: 650px;
  border-right: 1px solid rgb(185, 182, 182);
  display: flex;
}

.side-bar-inner .search {
  width: 220px;
  height: 60px;
  border-bottom: 1px solid rgb(185, 182, 182);
}
.side-bar-inner .search .search-input {
   width: 200px;
   margin: 14px 10px;
}
</style>
