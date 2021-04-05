import Vue from 'vue'
export default {
  getGames() {
    return Vue.prototype.$axios.get('/games');
  }
}
