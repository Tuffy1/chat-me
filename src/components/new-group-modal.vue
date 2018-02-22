<template>
  <div class="new-group">
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
  },
  methods: {
    submit () {},
    cancel () {},
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
