<template>
  <div class="setting">
    <side-bar-inner :obj="'setting'">
      <template slot="item-list">
        <side-bar-inner-item  goto="/center/setting/infoSetting" :obj="'setting'">
          基本设置
        </side-bar-inner-item>
        <side-bar-inner-item  goto="/center/setting/passwordSetting" :obj="'setting'">
          密码设置
        </side-bar-inner-item>
        <side-bar-inner-item  goto="" :obj="'setting'">
          注销
        </side-bar-inner-item>
      </template>
    </side-bar-inner>
    <router-view></router-view>
  </div>
</template>

<script>
import sideBarInner from '../../../components/side-bar-inner'
import sideBarInnerItem from '../../../components/side-bar-inner-item'

export default {
  components: {
    sideBarInner,
    sideBarInnerItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.setting {
  display: flex;
}
</style>
