<template>
  <container-layout></container-layout>
</template>

<script>
import { mapGetters } from 'vuex'

import containerLayout from '../components/container-layout'

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
  },
  components: {
    containerLayout
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login input {
  margin: 10px 0;
}
</style>
