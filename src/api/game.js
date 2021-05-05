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
    return Vue.prototype.$axios.patch(`/games/${id}`,game);
  },
  getGameByForumId(forumId) {
    return Vue.prototype.$axios.get(`/games?forumId=${forumId}`);
  },
  concernedOnGame({ authId, game, subscribed}) {
    if (game.followers) {
      if (!subscribed) {
        game.followers = [authId, ...game.followers]
      } else {
        let index = game.followers.findIndex(follow => follow == authId)
        game.followers.splice(index, 1)
      }
    }
    else game.followers = [authId];
    if (subscribed) return firebase.database().ref(`users/${authId}/concernedGames/${game.id}`).remove()
    return this.updateGameById(game.id, game).then(res => {
      const updates = {}
      updates[`users/${authId}/concernedGames/${game.id}`] = game.id
      return firebase.database().ref().update(updates)
    })
  }
}
