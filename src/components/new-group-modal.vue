<template>
  <div class="new-group">
    <Modal
        v-model="modalShow"
        title="添加新联系人"
        @on-ok="submit"
        @on-cancel="cancel">
        <Form :model="form" ref="form" :rules="ruleValidate" class="form">
          <FormItem prop="nickname" label="群昵称" width="100">
            <input v-model="form.nickname" placeholder="输入群名称" size="large">
          </FormItem>
          <FormItem prop="username" label="群名称" width="100">
            <input v-model="form.username" placeholder="输入群名称" size="large">
          </FormItem>
          <FormItem prop="introduce" label="群简介" width="100">
           <input v-model="form.introduce" placeholder="输入群简介" type="textarea" size="large">
          </FormItem>
          <FormItem prop="members" label="群成员">
            <Select
              v-model="form.members"
              multiple
              filterable
              remote
              :remote-method="remoteMethod"
              :loading="loading">
              <Option v-for="(user, index) in userList" :value="user" :key="index">{{user.username}}</Option>
            </Select>
          </FormItem>
        </Form>
    </Modal>
  </div>
</template>

<script>
export default {
  data () {
    const validateMembersCheck = (rule, value, callback) => {
      if (value.lenght === 0) {
        callback(new Error('Please add some members'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      newUser: '',
      userList: [],
      form: {
        nickname: '',
        username: '',
        introduce: '',
        members: []
      },
      ruleValidate: {
        nickname: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        username: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        members: [
          { required: true, validator: validateMembersCheck, trigger: 'blur' }
        ]
      }
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
    submit () {
      this.$store.dispatch('newGroup', this.form)
      .then(() => {
        this.$Message.success('添加成功')
        this.$emit('closeModal')
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
