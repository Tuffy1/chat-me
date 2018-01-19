import login from '../api/login'

export default {
  login: ({commit}, form) => {
    login(form)
    .then(result => Promise.resolve(), msg => Promise.reject(msg))
    commit('loginInit')
  }
}
