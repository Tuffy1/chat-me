<template>
  <div class="group-chat" id="group-chat">
    <side-bar-inner :obj="'user'">
      <template slot="item-list">
        <Collapse v-model="group">
          <Panel name="user" class="panel">
            联系人 
            <div class="icon-plus link-like" @click="newUser()"><Icon type="plus"></Icon></div>
            <p slot="content" v-if="friends.length === 0">未添加联系人</p>
            <p slot="content" v-else>
              <side-bar-inner-item  v-for="user in friends"
                                    :key="user._id"
                                    :goto="`/center/groupchat/userdetail?user=${user._id}`">
                <user-item :user="user"></user-item>
              </side-bar-inner-item>
              <side-bar-inner-item  v-if="newFriendNotification"
                                    :goto="`/center/groupchat/newfriend?form=${form}`">
                new friend
              </side-bar-inner-item>
            </p>
          </Panel>
          <Panel name="group" class="panel">
            群聊
            <div class="icon-plus link-like" @click="newGroup()"><Icon type="plus"></Icon></div>
            <p slot="content" v-if="groups.length === 0">未添加群聊</p>
            <p slot="content" v-else>
              <side-bar-inner-item  v-for="group in groups"
                                    :key="group._id"
                                    :goto="`/center/groupchat/groupdetail?group=${group._id}`">
                <user-item :user="group"></user-item>
              </side-bar-inner-item>
            </p>
          </Panel>
        </Collapse>
      </template>
    </side-bar-inner>
    <router-view></router-view>
    <new-user-modal :modalShow="userModalShow"
                    @closeModal="closeUserModal"></new-user-modal>
    <new-group-modal :modalShow="groupModalShow"
                    @closeModal="closeGroupModal"></new-group-modal>                
  </div>
</template>

<script>
import { mapState } from 'vuex'

import sideBarInner from '../../../components/side-bar-inner'
import sideBarInnerItem from '../../../components/side-bar-inner-item'
import userItem from '../../../components/user-item'
import newUserModal from '../../../components/new-user-modal'
import newGroupModal from '../../../components/new-group-modal'

export default {
  data () {
    return {
      group: '',
      userModalShow: false,
      groupModalShow: false,
      newFriendNotification: false,
      newFriendInfo: {}
    }
  },
  computed: {
    ...mapState(['friends', 'groups'])
  },
  sockets: {
    NEW_FRIEND: (form) => {
      this.newFriendNotification = true
      this.newFriendInfo = form
    }
  },
  methods: {
    newUser () {
      this.userModalShow = true
    },
    newGroup () {
      this.groupModalShow = true
    },
    closeUserModal () {
      this.userModalShow = false
    },
    closeGroupModal () {
      this.groupModalShow = false
    }
  },
  components: {
    sideBarInner,
    sideBarInnerItem,
    userItem,
    newUserModal,
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
