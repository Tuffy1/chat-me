export default {
  login: ({commit}, form) => {
    console.log(form.username)
    console.log(form.password)
    commit('loginInit')
  }
}
