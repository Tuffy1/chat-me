<template>
  <div class="new-user">
    <Modal
        v-model="modalShow"
        title="添加新成员"
        @on-ok="submit"
        @on-cancel="cancel">
        <Select
          v-model="newMembers"
          filterable
          multiple
          remote
          :remote-method="remoteMethod"
          :loading="loading">
          <Option v-for="USER in userList" :value="JSON.stringify(USER)" :key="USER._id" :disabled="isMe(USER)">
            <span v-if="isMe(USER)">{{USER.username}} (本人)</span>
            <span v-else>{{USER.username}}</span>
          </Option>
        </Select>
    </Modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      loading: false,
      groupId: '',
      newMembers: [],
      userList: []
    }
  },
  props: {
    modalShow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState(['user', 'friends', 'theGroup'])
  },
  methods: {
    submit () {
      const group = {
        _id: this.theGroup._id,
        nickname: this.theGroup.nickname,
        username: this.theGroup.username,
        avatar: this.theGroup.avatar,
        introduce: this.theGroup.introduce,
        creatAt: this.theGroup.creatAt
      }
      let tempArr = []
      let tempMember = {}
      this.newMembers.forEach(member => {
        tempMember = JSON.parse(member)
        tempMember.role = 3
        tempArr.push(tempMember)
      })
      this.newMembers = tempArr
      this.$store.dispatch('newGroupMember', {
        group: group,
        newMembers: this.newMembers
      })
      .then(() => {
        this.$Message.success('添加成功')
        return this.$store.dispatch('getGroupInfo', group._id)
      }, msg => this.$Message.warning(msg))
      .then(() => {
        this.$emit('closeModal')
      }, msg => this.$Message.warning(msg))
    },
    cancel () {
      this.newMembers = []
      this.$emit('closeModal')
    },
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.$store.dispatch('userSearch', {
            query: query
          })
          .then((result) => {
            this.loading = false
            this.userList = result
          }, (msg) => Promise.reject(msg))
        }, 200)
      } else {
        this.loading = false
        this.userList = []
      }
    },
    isMe (USER) {
      if (USER.username === this.user.username) {
        return true
      }
      return false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
