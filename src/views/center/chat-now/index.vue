<template>
  <div class="chat-now">
    <side-bar-inner>
      <template slot="item-list">
        <side-bar-inner-item goto="/center/chatting/detail?user='123'">
          <user-item></user-item>
        </side-bar-inner-item>
        <side-bar-inner-item goto="/center/chatting/detail?user='124'">
          <user-item></user-item>
        </side-bar-inner-item>
        <side-bar-inner-item goto="/center/chatting/detail?user='125'">
          <user-item></user-item>
        </side-bar-inner-item>
      </template>
    </side-bar-inner>
    <router-view></router-view>
  </div>
</template>

<script>
import sideBarInner from '../../../components/side-bar-inner'
import sideBarInnerItem from '../../../components/side-bar-inner-item'
import userItem from '../../../components/user-item'

export default {
  components: {
    sideBarInner,
    sideBarInnerItem,
    userItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chat-now {
  display: flex;
}
</style>
