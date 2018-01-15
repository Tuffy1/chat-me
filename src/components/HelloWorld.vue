<template>
  <div class="login">
    <input v-model="username" placeholder="Enter something..." style="width: 300px"><br>
    <input v-model="password" placeholder="Enter something..." style="width: 300px"><br>
    <Button type="ghost" @click="login()">Submit</Button>
    <Button type="ghost">Cancel</Button>
  </div>
</template>

<script>
import { mapGetters } from 'Vuex'
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
      }, () => Promise.reject())
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
