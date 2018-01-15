import login from '../api/login'

export default {
  login: ({commit}, form) => {
    console.log(form.username)
    console.log(form.password)
    login(form)
    .then(result => Promise.resolve(), msg => Promise.reject(msg))
    commit('loginInit')
  }
}
