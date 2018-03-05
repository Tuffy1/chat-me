<template>
  <div class="setting">
    <Form :model="passwordForm" ref="passwordForm" :rules="passwordRuleValidate" :label-width="80" label-position="left" class="form">
      <FormItem prop="oldPassword" label="原密码">
        <i-input v-model="passwordForm.oldPassword" placeholder="输入原密码"></i-input>
      </FormItem>
      <FormItem prop="newPassword" label="新密码">
        <i-input v-model="passwordForm.newPassword" placeholder="输入新密码"></i-input>
      </FormItem>
      <FormItem prop="checkPassword" label="密码确认">
        <i-input v-model="passwordForm.checkPassword" placeholder="再次输入新密码"></i-input>
      </FormItem>
      <FormItem>
      <Button type="success" id="submit-btn" @click="onSubmit">Submit</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      passwordForm: {
        oldPassword: '',
        newPassword: '',
        checkPassword: ''
      },
      passwordRuleValidate: {
        oldPassword: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs['passwordForm'].validate((value) => {
        this.$store.dispatch('setUserPassword', this.passwordForm)
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
