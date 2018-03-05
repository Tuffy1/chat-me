<template>
  <div class="login">
    <Row>
      <Col span="8" offset="8">
        <Card style="width:350px">
            <p slot="title">
                登陆
            </p>
            <a href="#" slot="extra" @click.prevent="changeLimit">
                <Icon type="ios-loop-strong"></Icon>
                Change
            </a>
            <Form :model="form" ref="form" :rules="ruleValidate" :label-width="80" label-position="left" class="form">
              <FormItem prop="username" label="用户名">
                <i-input v-model="form.username" placeholder="输入用户名"></i-input>
              </FormItem>
              <FormItem prop="password" label="密码">
                <i-input v-model="form.password" placeholder="输入密码"></i-input>
              </FormItem>
              <p class="to-register">未有账号？<a @click="toRegister">注册</a></p>
              <FormItem id="submit-btn">
                <Button type="ghost" @click="login()">Submit</Button>
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
    return {
      form: {
        username: '',
        password: ''
      },
      ruleValidate: {
        username: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['loginState'])
  },

  methods: {
    toRegister () {
      this.$router.push('/register')
    },
    login () {
      this.$store.dispatch('login', {
        username: this.form.username,
        password: this.form.password
      })
      .then(() => {
        this.$store.commit('loginInit')
        this.$router.push('/center')
      }, (msg) => Promise.reject(msg))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login input {
  width: 80%;
  height: 30px;
  margin: 12px 0;
}
.login .to-register {
  margin: 12px 0;
}
#submit-btn {
  margin-left: -80px;
}
</style>
