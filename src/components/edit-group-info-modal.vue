<template>
  <div class="new-user">
    <Modal
        v-model="modalShow"
        title="编辑群信息"
        @on-ok="submit"
        @on-cancel="cancel">
        <Form :model="form" ref="form" :rules="ruleValidate" :label-width="80" label-position="left" class="form">
          <FormItem prop="username" label="用户名">
            <i-input v-model="form.username" placeholder="输入用户名"></i-input>
          </FormItem>
          <FormItem prop="nickname" label="密码">
            <i-input v-model="form.nickname" placeholder="输入群昵称"></i-input>
          </FormItem>
          <FormItem prop="introduce" label="密码">
            <i-input v-model="form.introduce" placeholder="输入群介绍"></i-input>
          </FormItem>
        </Form>
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
    ...mapState(['user', 'friends'])
  },
  methods: {
    submit () {
    },
    cancel () {
      this.$emit('closeModal')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
