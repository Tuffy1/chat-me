<template>
  <div class="new-user">
    <Modal
        v-model="modalShow"
        title="添加新联系人"
        @on-ok="submit"
        @on-cancel="cancel">
        <Select
          v-model="newUser"
          filterable
          remote
          :remote-method="remoteMethod"
          :loading="loading">
          <Option v-for="(user, index) in userList" :value="user.username" :key="index">{{user.username}}</Option>
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
      newUser: '',
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
    ...mapState(['friends'])
  },
  methods: {
    submit () {
      // if (this.friends.some(user => user.username === this.newUser.username)) {
      //   this.$Message.warning('该用户已在联系人列表')
      // } else {
      //   this.$store.dispatch('newFriend', this.newUser)
      //   .then(() => {
      //     this.$Message.success('添加成功')
      //   }, msg => this.$message(msg))
      // }
      this.$store.dispatch('newFriend', this.newUser)
      .then(() => {
        this.$Message.success('添加成功')
      }, msg => this.$Message.warning(msg))
    },
    cancel () {
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
