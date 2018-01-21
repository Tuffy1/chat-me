import register from '../api/register'
import login from '../api/login'

export default {
  register: ({commit}, form) => {
    register(form)
    .then(result => Promise.resolve(), msg => Promise.reject(msg))
    commit('loginInit')
  },
  login: ({commit}, form) => {
    login(form)
    .then(result => Promise.resolve(), msg => Promise.reject(msg))
    commit('loginInit')
  }
}
