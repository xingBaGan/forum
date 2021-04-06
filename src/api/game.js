import Vue from 'vue'
export default {
  getGames() {
    return Vue.prototype.$axios.get('/games');
  },
  getGameById(id) {
    return Vue.prototype.$axios.get(`/games/${id}`);
  },
  getGameByForumId(forumId) {
    return Vue.prototype.$axios.get(`/games?forumId=${forumId}`);
  }
}
