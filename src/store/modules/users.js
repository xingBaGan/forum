
import firebase from 'firebase'
import { makeAppendChildToParentMutation } from '@/store/assetHelpers'
import { OBTreeToArrayWithId, countObjectProperties, removeEmptyProperties } from '@/utils'
import Vue from 'vue'
export default {
  namespaced: true,
  state: {
    items: {}
  },
  getters: {
    usersWithId(state) {
      return OBTreeToArrayWithId(state.items);
    },
    userPosts: (state, getters, rootState) => id => {
      const user = state.items[id]
      if (user.posts) {
        return Object.values(rootState.posts.items)
          .filter(post => post.userId === id)
      }
      return []
    },
    userPostsCount(state) {
      return function (id) {
        const user = state.items[id]
        return countObjectProperties(user.posts)
      }
    },
    userThreadsCount(state) {
      return function (id) {
        const user = state.items[id]
        return countObjectProperties(user.threads)
      }
    }
  },
  mutations: {
    setUser(state, { user, userId }) {
      Vue.set(state.items, userId, user)
    },
    appendPostToUser: makeAppendChildToParentMutation({ parent: 'users', child: 'posts' }),
    appendThreadToUser: makeAppendChildToParentMutation({ parent: 'users', child: 'threads' })
  },
  actions: {
    createUser({ state, commit }, { id, email, name, username, password, avatar = null }) {
      return new Promise((resolve, reject) => {
        const registeredAt = Math.floor(Date.now() / 1000)
        const usernameLower = username.toLowerCase()
        email = email.toLowerCase()
        const user = { avatar, email, name, username, password, usernameLower, registeredAt }
        firebase.database().ref('users').child(id).set(user)
          .then(() => {
            commit('setItem', { resource: 'users', id: id, item: user }, { root: true })
            resolve(state.items[id])
          })
      })
    },
    updateUser({ commit }, user) {
      const updates = {
        avatar: user.avatar,
        username: user.username,
        name: user.name,
        bio: user.bio,
        website: user.website,
        email: user.email,
        location: user.location
      }
      return new Promise((resolve, reject) => {
        firebase.database().ref('users').child(user['id']).update(removeEmptyProperties(updates))
          .then(() => {
            commit('setUser', { userId: user['id'], user })
            resolve(user)
          })
      })
    },
    fetchUser: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'users', id, emoji: '🙋' }, { root: true }),
    fetchUsers: ({ dispatch }, { ids }) => dispatch('fetchItems', { resource: 'users', ids, emoji: '🙋' }, { root: true })
  }
}
