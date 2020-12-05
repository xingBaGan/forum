import Vue from 'vue'
import Vuex from 'vuex'
import sourceDate from '@/data'
import { OBTreeToArrayWithId } from '@/utils'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...sourceDate,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },
  getters: {
    authUser(state, getters) {
      // return state.users[state.authId]
      return getters.usersWithId.filter(item => item.id === state.authId)[0]
    },
    categoriesWithId(state) {
      return OBTreeToArrayWithId(state.categories);
    },
    threadsWithId(state) {
      return OBTreeToArrayWithId(state.threads);
    },
    postsWithId(state) {
      return OBTreeToArrayWithId(state.posts);
    },
    forumsWithId(state) {
      return OBTreeToArrayWithId(state.forums);
    },
    usersWithId(state) {
      return OBTreeToArrayWithId(state.users);
    }
  },
  mutations: {
    setPost(state, { post, postId }) {
      Vue.set(state.posts, postId, post);
    },
    setUser(state, { user, userId }) {
      Vue.set(state.users, userId, user);
    },
    appendPostToThread(state, { postId, threadId }) {
      const thread = state.threads[threadId];
      Vue.set(thread.posts, postId, postId);
    },
    appendPostToUser(state, { postId, userId }) {
      const user = state.users[userId]
      Vue.set(user.posts, postId, postId);
    }
  },
  actions: {
    createPost(context, post) {
      let postId = "greatPost" + Math.random();
      post.userId = context.state.authId;
      post.publishedAt = Math.floor(Date.now() / 1000);
      //set post
      context.commit('setPost', { post, postId })
      //append post to thread
      context.commit('appendPostToThread', { postId, threadId: post.threadId })
      //append post to user
      context.commit('appendPostToUser', { postId, userId: post.userId })
    },
    updateUser({ commit }, user) {
      commit('setUser', { userId: user.id, user })
    }
  },
  modules: {
  }
})
