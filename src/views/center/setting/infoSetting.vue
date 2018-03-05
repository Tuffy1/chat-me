<template>
  <div class="setting">
    <Form :model="infoForm" ref="infoForm" :rules="infoRuleValidate" :label-width="80" label-position="left" class="form">
      <FormItem prop="nickname" label="昵称">
        <i-input v-model="infoForm.nickname" placeholder="输入昵称"></i-input>
      </FormItem>
      <FormItem prop="username" label="用户名">
        <i-input v-model="infoForm.username" disabled></i-input>
      </FormItem>
      <FormItem prop="email" label="邮箱">
        <i-input v-model="infoForm.email" placeholder="输入邮箱"></i-input>
      </FormItem>
      <FormItem prop="introduce" label="简介">
        <i-input v-model="infoForm.introduce" placeholder="输入简介"></i-input>
      </FormItem>
      <FormItem>
      <Button type="success" id="submit-btn" @click="onSubmit">Submit</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {cloneDeep} from 'lodash'

export default {
  data () {
    return {
      infoForm: {
        nickname: '',
        username: '',
        email: '',
        introduce: ''
      },
      infoRuleValidate: {
        nickname: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    $route () {
      this.init()
    }
  },
  created () {
    this.init()
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    init () {
      this.infoForm = cloneDeep(this.user)
    },
    onSubmit () {
      this.$refs['infoForm'].validate((value) => {
        this.$store.dispatch('setUserInfo', this.infoForm)
        .then(() => this.$Message.success('修改成功'), (msg) => Promise.reject(msg))
      })
    }
  }
}
</script>

<style scoped>
.setting {
  width: 577px;
  height: 499px;
  padding: 15px;
}
.setting .form {
  width: 100%;
  text-align: left;
  margin-top: 10px;
}
#submit-btn {
  margin-left: -80px;
}
</style>
