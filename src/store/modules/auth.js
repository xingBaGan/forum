import firebase from 'firebase'
import $api from "@/api";
export default {
  state: {
    authId: null,
    task: {}
  },
  mutations: {
    setAuthId(state, id) {
      state.authId = id
    },
    setTask(state, task) {
      state.task = task
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
    },
    fetchTask({ commit, state, dispatch }) {
      $api.tasks.getTaskByUserId(state.authId).then((res) => {
        if (!res.data[0]) {
          $api.tasks.newTask({ userId: state.authId, checkInData: [], points: 0 }).then(() => {
            dispatch('fetchTask')
          })
          return
        }
        commit('setTask', res.data[0])
      })
    },
    checkInByDay({ commit ,state }, today) {
      let newTask = { ...state.task }
      newTask.points += today.amount
      newTask.checkInData.push(today)
      $api.tasks.checkIn(newTask).then(() => {
        commit('setTask', newTask)
      })
    },
    addPoints({ commit, state }, points) {
      let newTask = { ...state.task }
      newTask.points += points
      $api.tasks.checkIn(newTask).then(() => {
        commit('setTask', newTask)
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
