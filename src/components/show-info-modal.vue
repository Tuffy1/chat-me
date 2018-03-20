<template>
  <div class="new-user">
    <Modal
        v-model="modalShow"
        @on-cancel="cancel">
        <p slot="header">我的名片</p>
        <Card>
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
        </Card>
        <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    modalShow: {
      type: Boolean,
      default: false
    },
    userInfo: {
      type: Object
    }
  },
  methods: {
    cancel () {
      this.$emit('closeModal')
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
