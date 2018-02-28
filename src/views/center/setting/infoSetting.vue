<template>
  <div class="setting">
    <Form :model="infoForm" ref="infoForm" :rules="infoRuleValidate" class="form">
      <FormItem prop="nickname" label="昵称" size="100">
        <input v-model="infoForm.nickname" placeholder="输入昵称" size="large">
      </FormItem>
      <FormItem prop="username" label="用户名" size="100">
        <input v-model="infoForm.username" placeholder="输入用户名" size="large">
      </FormItem>
      <FormItem prop="email" label="邮箱" size="100">
        <input v-model="infoForm.email" placeholder="输入邮箱" size="large">
      </FormItem>
      <FormItem prop="introduce" label="简介" size="100">
        <input v-model="infoForm.introduce" placeholder="输入简介" size="large">
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
