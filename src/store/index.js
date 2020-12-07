import Vue from 'vue'
import Vuex from 'vuex'
import sourceDate from '@/data'
import { OBTreeToArrayWithId, countObjectProperties } from '@/utils'
Vue.use(Vuex)

const makeAppendChildToParentMutation = ({ parent, child }) => {
  return (state, { childId, parentId }) => {
    const resource = state[parent][parentId];
    if (!resource[child]) {
      Vue.set(resource, child, {})
    }
    Vue.set(resource[child], childId, childId);
  }
}

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
    },
    userPostsCount(state) {
      return function (id) {
        const user = state.users[id]
        return countObjectProperties(user.posts)
      }
    },
    userThreadsCount(state) {
      return function (id) {
        const user = state.users[id]
        return countObjectProperties(user.threads)
      }
    },
    threadRepliesCount: (state) => (id) => countObjectProperties(state.threads[id].posts) - 1

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
    appendPostToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'posts' }),
    appendPostToUser: makeAppendChildToParentMutation({ parent: 'users', child: 'posts' }),
    appendThreadToForum: makeAppendChildToParentMutation({ parent: 'forums', child: 'threads' }),
    appendThreadToUser: makeAppendChildToParentMutation({ parent: 'users', child: 'threads' })
  },
  actions: {
    createPost(context, post) {
      let postId = "greatPost" + Math.random();
      post.userId = context.state.authId;
      post.publishedAt = Math.floor(Date.now() / 1000);
      //set post
      context.commit('setPost', { post, postId })
      //append post to thread
      context.commit('appendPostToThread', { childId: postId, parentId: post.threadId })
      //append post to user
      context.commit('appendPostToUser', { childId: postId, parentId: post.userId })

      return Promise.resolve(postId)
    },
    updatePost({ state, commit }, { id, text }) {
      return new Promise((resolve, reject) => {
        const post = state.posts[id];
        commit('setPost', {
          postId: id,
          post: {
            ...post,
            text,
            edited: {
              at: Math.floor(Date.now() / 1000),
              by: state.authId
            }
          }
        })
        resolve(id)
      });
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
        commit('appendThreadToForum', { childId: threadId, parentId: forumId })
        commit('appendThreadToUser', { childId: threadId, parentId: userId })
        resolve(threadId)
      })
    },
    updateThread({ state, commit, dispatch }, { text, title, threadId }) {
      return new Promise((resolve, reject) => {
        const thread = state.threads[threadId];
        const updatedThread = { ...thread, title }
        commit('setThread', { thread: updatedThread, threadId: threadId })
        dispatch('updatePost', { id: thread.firstPostId, text }).then((postId) => {
          resolve(threadId)
        })
      })
    }
  },
  modules: {
  }
})
