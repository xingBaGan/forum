import firebase from 'firebase'

export default {
  state: {
    authId: null
  },
  mutations: {
    setAuthId(state, id) {
      state.authId = id
    }
  },
  actions: {
    signInWithEmailAndPassword(context, { email, password }) {
      return firebase.auth().signInWithEmailAndPassword(email, password)
    },
    signOut({ commit }) {
      return firebase.auth().signOut().then(() => {
        commit('setAuthId', null)
      })
    },
    fetchAuthUser({ dispatch, commit }) {
      const userId = firebase.auth().currentUser.uid
      console.log("🌵 userId" + userId)
      if (!userId) return null;
      return new Promise((resolve, reject) => {
        // check if user exists in the database
        firebase.database().ref('users').child(userId).once('value', snapshot => {
          if (snapshot.exists()) {
            return dispatch('users/fetchUser', { id: userId }, { root: true })
              .then(user => {
                commit('setAuthId', userId)
                resolve(user)
              })
          } else {
            resolve(null)
          }
        })
      })
    },
    initAuthentication({ dispatch }) {
      return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(user => {
          console.log('👣 the user has changed')
          if (user) {
            dispatch('fetchAuthUser')
          }
          resolve(user)
        })
      })
    },
    registerUserWithEmailAndPassword({ dispatch }, { email, name, username, password, avatar = null }) {
      return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(data => {
          return dispatch("users/createUser", { id: data.user.uid, email, name, username, password, avatar }, { root: true })
        })
    }
  },
  getters: {
    authUser(state, getters, rootState, rootGetters) {
      // return rootState
      return state.authId ? rootGetters['users/usersWithId'].find(user => user.id === state.authId) : null;
    }
  },
  namespaced: true
}
