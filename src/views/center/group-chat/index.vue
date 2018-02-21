<template>
  <div class="group-chat" id="group-chat">
    <side-bar-inner>
      <template slot="item-list">
        <Collapse v-model="group">
          <Panel name="user" class="panel">
            联系人 
            <div class="icon-plus link-like" @click="newUser()"><Icon type="plus"></Icon></div>
            <p slot="content">
              <side-bar-inner-item goto="/center/groupchat/detail?user='123'">
                <user-item></user-item>
              </side-bar-inner-item>
            </p>
          </Panel>
          <Panel name="group" class="panel">
            群聊
            <div class="icon-plus link-like" @click="newGroup()"><Icon type="plus"></Icon></div>
            <p slot="content">
              <side-bar-inner-item goto="/center/groupchat/detail?user='234'">
                <user-item></user-item>
              </side-bar-inner-item>
              <side-bar-inner-item goto="/center/groupchat/detail?user='345'">
                <user-item></user-item>
              </side-bar-inner-item>
            </p>
          </Panel>
        </Collapse>
      </template>
    </side-bar-inner>
    <router-view></router-view>
    <new-group-modal :modalShow="modalShow"></new-group-modal>
  </div>
</template>

<script>
import sideBarInner from '../../../components/side-bar-inner'
import sideBarInnerItem from '../../../components/side-bar-inner-item'
import userItem from '../../../components/user-item'
import newGroupModal from '../../../components/new-group-modal'

export default {
  data () {
    return {
      group: '',
      modalShow: false
    }
  },
  methods: {
    newUser () {
      this.modalShow = true
    }
  },
  components: {
    sideBarInner,
    sideBarInnerItem,
    userItem,
    newGroupModal
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.group-chat{
  text-align: left;
  display: flex;
}
.panel {
  position: relative;
}
.icon-plus {
  position: absolute;
  right: 10px;
  top: 0px;
  z-index: 100;
}
</style>
