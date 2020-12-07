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
    setThread(state, { thread, threadId }) {
      Vue.set(state.threads, threadId, thread);
    },
    appendPostToThread(state, { postId, threadId }) {
      const thread = state.threads[threadId];
      if (!thread.posts) {
        Vue.set(thread, 'posts', {})
      }
      Vue.set(thread.posts, postId, postId);
    },
    appendPostToUser(state, { postId, userId }) {
      const user = state.users[userId]
      if (!user.posts) {
        Vue.set(user, 'posts', {})
      }
      Vue.set(user.posts, postId, postId);
    },
    appendThreadToForum(state, { forumId, threadId }) {
      const forum = state.forums[forumId]
      if (!forum.threads) {
        Vue.set(forum, 'threads', {})
      }
      Vue.set(forum.threads, threadId, threadId);
    },
    appendThreadToUser(state, { threadId, userId }) {
      const user = state.users[userId]
      if (!user.threads) {
        Vue.set(user, 'threads', {})
      }
      Vue.set(user.threads, threadId, threadId);
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

      return Promise.resolve(postId)
    },
    updateUser({ commit }, user) {
      commit('setUser', { userId: user.id, user })
    },
    createThread({ commit, state, dispatch }, { text, title, forumId }) {
      return new Promise((resolve, reject) => {
        const threadId = 'greatThread' + Math.random() * 10000
        const userId = state.authId;
        const publishedAt = Math.floor(Date.now() / 1000);
        const thread = {
          forumId,
          title,
          userId,
          publishedAt
        }
        commit('setThread', { thread, threadId })
        dispatch('createPost', {
          text,
          threadId
        }).then(postId => {
          commit('setThread', { threadId, thread: { ...thread, firstPostId: postId } })
        })
        commit('appendThreadToForum', { threadId, forumId })
        commit('appendThreadToUser', { threadId, userId })
        resolve(threadId)
      })
    },
    updateThread({ state, commit }, { text, title, threadId }) {
      return new Promise((resolve, reject) => {
        const thread = state.threads[threadId];
        const post = state.posts[thread.firstPostId]
        const updatedThread = { ...thread, title }
        const updatedPost = { ...post, text }

        commit('setThread', { thread: updatedThread, threadId: threadId })
        commit('setPost', { post: updatedPost, postId: thread.firstPostId })
        resolve(threadId)
      })
    }
  },
  modules: {
  }
})
