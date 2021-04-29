import Vue from 'vue'
import firebase from 'firebase'
export default {
  getGames() {
    return Vue.prototype.$axios.get('/games');
  },
  getGameById(id) {
    return Vue.prototype.$axios.get(`/games/${id}`);
  },
  updateGameById(id,game) {
    return Vue.prototype.$axios.post(`/games/${id}`,game);
  },
  getGameByForumId(forumId) {
    return Vue.prototype.$axios.get(`/games?forumId=${forumId}`);
  }
}
