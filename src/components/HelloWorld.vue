<template>
  <div class="login">
    <input v-model="username" placeholder="Enter something..." style="width: 300px"><br>
    <input v-model="password" placeholder="Enter something..." style="width: 300px"><br>
    <Button type="ghost" @click="login()">Submit</Button>
    <Button type="ghost">Cancel</Button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['login']),
    login () {
      this.$store.dispatch('login', {
        username: this.username,
        password: this.password
      })
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
