<template>
  <div class="setting">
    <Form :model="passwordForm" ref="passwordForm" :rules="passwordRuleValidate" class="form">
      <FormItem prop="oldPassword" label="原密码">
        <input v-model="passwordForm.oldPassword" placeholder="输入原密码" size="large">
      </FormItem>
      <FormItem prop="newPassword" label="新密码">
        <input v-model="passwordForm.newPassword" placeholder="输入新密码" size="large">
      </FormItem>
      <FormItem prop="checkPassword" label="密码确认">
        <input v-model="passwordForm.checkPassword" placeholder="再次输入新密码" size="large">
      </FormItem>
      <FormItem>
      <Button type="success" @click="Submit()">Submit</Button>
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
}
</style>
