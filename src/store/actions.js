import firebase from 'firebase'
import 'firebase/firebase-database'
export default {
  fetchItem: ({ state, commit }, { id, emoji, resource }) => {
    console.log('🔥 ', emoji, id)
    return new Promise((resolve, reject) => {
      firebase.database().ref(resource).child(id).once('value', snapshot => {
        const item = snapshot.val()
        commit('setItem', { resource, item, id: snapshot.key })
        resolve(state[resource].items[id])
      }).catch(err => {
        console.log(err)
      })
    })
  },
  fetchItems: ({ dispatch }, { ids, emoji, resource }) => Promise.all(ids.map(id => dispatch('fetchItem', { id, resource, emoji })))
}
