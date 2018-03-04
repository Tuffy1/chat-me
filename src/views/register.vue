<template>
  <div class="register">
    <Row>
      <Col span="8" offset="8">
        <Card style="width:350px">
            <p slot="title">
                注册
            </p>
            <a href="#" slot="extra" @click.prevent="changeLimit">
                <Icon type="ios-loop-strong"></Icon>
                Change
            </a>
             <Form :model="form" ref="form" :rules="ruleValidate" :label-width="80" label-position="left" class="form">
               <FormItem prop="nickname" label="昵称">
                 <i-input v-model="form.nickname" placeholder="输入昵称"></i-input>
               </FormItem>
               <FormItem prop="username" label="用户名">
                 <i-input v-model="form.username" placeholder="输入用户名"></i-input>
               </FormItem>
               <FormItem prop="email" label="邮箱">
                 <i-input v-model="form.email" placeholder="输入邮箱"></i-input>
               </FormItem>
               <FormItem prop="password" label="密码">
                <i-input v-model="form.password" placeholder="输入密码"></i-input>
               </FormItem>
               <FormItem prop="passwordConfirm" label="密码确认">
                <i-input v-model="form.passwordConfirm" placeholder="再次输入密码"></i-input><br>
               </FormItem>
               <p class="to-register">已有账号？<a @click="toLogin">登陆</a></p>
               <FormItem id="submit-btn">
                <Button type="ghost" @click="register()">Submit</Button>
                <Button type="ghost">Cancel</Button>
               </FormItem>
             </Form>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your password'))
      } else {
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your password again'))
      } else if (value !== this.form.password) {
        callback(new Error('The two input passwords do not match!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: '',
        password: '',
        passwordConfirm: ''
      },
      ruleValidate: {
        nickname: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        username: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        passwordConfirm: [
          { required: true, validator: validatePassCheck, trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['loginState'])
  },
  methods: {
    toLogin () {
      this.$router.push('/login')
    },
    register () {
      this.$refs['form'].validate((value) => {
        if (value) {
          this.$store.dispatch('register', {
            nickname: this.form.nickname,
            username: this.form.username,
            password: this.form.password,
            email: this.form.email
          })
          .then(() => {
            this.$Message.success('注册成功')
            this.$router.push('/login')
          }, (msg) => this.$Message.warning(msg))
        }
      })
      // this.$http.post('/api/login', {
      //   username: this.username,
      //   password: this.password
      // })
      // .then(result => Promise.resolve(), msg => Promise.reject(msg))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.register .form {
  margin-top: 24px;
}
.register input {
  width: 100%;
  height: 30px;
}
.register button {
  margin: 24px 10px;
}
#submit-btn {
  margin-left: -80px;
}
</style>
