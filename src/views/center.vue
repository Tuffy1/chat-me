<template>
  <div class="login">
    hello world!
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
  methods: {
    login () {
      this.$store.dispatch('login', {
        username: this.username,
        password: this.password
      })
      .then(() => {
        console.log(`loginState:${this.loginState}`)
      }, (msg) => Promise.reject(msg))
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
.login input {
  margin: 10px 0;
}
</style>
