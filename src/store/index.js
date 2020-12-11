import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import threads from './modules/threads'
import users from './modules/users'
import posts from './modules/posts'
import forums from './modules/forums'
import categories from './modules/categories'
import auth from './modules/auth'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // ...sourceDate,
  },
  getters,
  mutations,
  actions,
  modules: {
    threads,
    users,
    posts,
    forums,
    categories,
    auth
  }
})
