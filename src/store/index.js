import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
// import sourceDate from '@/data'
// import { OBTreeToArrayWithId, countObjectProperties } from '@/utils'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // ...sourceDate,
    users: {},
    forums: {},
    threads: {},
    posts: {},
    categories: {},
    authId: null

  },
  getters,
  mutations,
  actions
})
