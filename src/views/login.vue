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
            <input v-model="username" placeholder="输入用户名" size="large"><br/>
            <input v-model="password" placeholder="输入密码" size="large"><br/>
            <p class="to-register">未有账号？<a @click="toRegister">注册</a></p>
            <Button type="ghost" @click="login()">Submit</Button>
            <Button type="ghost">Cancel</Button>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters(['loginState'])
  },
  created () {
    this.test()
  },
  methods: {
    test () {
      this.$socket.emit('chat message', 'hey')
    },
    toRegister () {
      this.$router.push('/register')
    },
    login () {
      this.$store.dispatch('login', {
        username: this.username,
        password: this.password
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
.login button {
  margin: 12px 10px;
}
</style>
