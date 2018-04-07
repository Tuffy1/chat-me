<template>
  <div class="new-user">
    <Modal
        v-model="isShow"
        @on-cancel="cancel">
        <p slot="header" v-if="isGroupMember">{{userInfo.nickname}}</p>
        <p slot="header" v-else>我的名片</p>
        <div class="card">
          <div>
            <p>nickname: </p>
            <p>username: </p>
            <p>introduce: </p>
          </div>
          <div>
            <p>{{userInfo.nickname}}</p>
            <p>{{userInfo.username}}</p>
            <p>{{userInfo.introduce}}</p>
          </div>
        </div>
        <div slot="footer" v-if="isGroupMember">
          <Button type="primary" v-if="imOwnerSelf && isMember" @click="changeRole(2)">设为管理员</Button>
          <Button type="primary" v-if="imOwnerSelf && isManager" @click="changeRole(3)">设为成员</Button>
          <Button type="error" v-if="compareRole" @click="removeGroupMember">移出群聊</Button>
          <Button type="error" v-if="imMemberSelf || imManagerSelf" @click="leaveGroup">退出群聊</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      myRoleInGroup: 3,
      hisRoleInGroup: 3
    }
  },
  props: ['modalShow', 'userInfo', 'isGroupMember'],
  watch: {
    $route () {
      this.init()
    }
  },
  created () {
    this.init()
  },
  computed: {
    ...mapState(['user', 'theGroup']),
    isShow: {
      get: function () {
        return this.modalShow
      },
      set: function () {
      }
    },
    imOwnerSelf () {
      this.getRoleInGroup()
      if (this.myRoleInGroup === 1 && this.user._id !== this.userInfo._id) {
        return true
      }
      return false
    },
    imMemberSelf () {
      this.getRoleInGroup()
      if (this.myRoleInGroup === 3 && this.user._id === this.userInfo._id) {
        return true
      }
      return false
    },
    imManagerSelf () {
      this.getRoleInGroup()
      if (this.myRoleInGroup === 2 && this.user._id === this.userInfo._id) {
        return true
      }
      return false
    },
    isMember () {
      this.getHisRoleInGroup()
      if (this.hisRoleInGroup === 3) {
        return true
      }
      return false
    },
    isManager () {
      this.getHisRoleInGroup()
      if (this.hisRoleInGroup === 2) {
        return true
      }
      return false
    },
    compareRole () {
      this.getRoleInGroup()
      this.getHisRoleInGroup()
      if (this.myRoleInGroup < this.hisRoleInGroup) {
        return true
      }
      return false
    }
  },
  methods: {
    init () {
    },
    getRoleInGroup () {
      this.theGroup.members.forEach(member => {
        if (member._id === this.user._id) {
          this.myRoleInGroup = member.role
        }
      })
    },
    getHisRoleInGroup () {
      this.theGroup.members.forEach(member => {
        if (member._id === this.userInfo._id) {
          this.hisRoleInGroup = member.role
        }
      })
    },
    cancel () {
      this.$emit('closeModal')
    },
    removeGroupMember () {
      this.$store.dispatch('deleteGroupMember', {
        groupId: this.theGroup._id,
        memberId: this.userInfo._id
      })
      .then(() => {
        this.$store.dispatch('getGroupInfo', this.theGroup._id)
      }, msg => this.$Message.warning(msg))
      .then(() => {
        this.$Message.success('移出成功')
        this.cancel()
      }, msg => this.$Message.warning(msg))
    },
    leaveGroup () {
      this.$store.dispatch('deleteGroupMember', {
        groupId: this.theGroup._id,
        memberId: this.userInfo._id
      })
      .then(() => {
        return this.$store.dispatch('getChatNow')
      }, msg => this.$Message.warning(msg))
      .then(() => {
        this.$Message.success('退出成功')
        this.cancel()
      }, msg => this.$Message.warning(msg))
    },
    changeRole (newRole) {
      this.$store.dispatch('changeMemberRole', {
        groupId: this.theGroup._id,
        memberId: this.userInfo._id,
        newRole: newRole
      })
      .then(() => {
        this.$store.dispatch('getGroupInfo', this.theGroup._id)
      }, msg => this.$Message.warning(msg))
      .then(() => {
        this.$Message.success('设置成功')
        this.cancel()
      }, msg => this.$Message.warning(msg))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  display: flex;
}
</style>
