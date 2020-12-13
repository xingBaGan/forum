import { OBTreeToArrayWithId, countObjectProperties } from '@/utils'
import firebase from 'firebase'
import { makeAppendChildToParentMutation } from '@/store/assetHelpers'
import Vue from 'vue'
export default {
  namespaced: true,
  state: {
    items: {}
  },
  getters: {
    threadsWithId(state) {
      return OBTreeToArrayWithId(state.items);
    },
    threadRepliesCount: (state) => (id) => countObjectProperties(state.items[id].posts) - 1

  },
  mutations: {
    setThread(state, { thread, threadId }) {
      Vue.set(state.items, threadId, thread)
    },
    appendPostToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'posts' }),
    appendContributorToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'contributors' })
  },
  actions: {
    fetchThreads: ({ dispatch }, { ids }) => dispatch('fetchItems', { resource: 'threads', ids, emoji: '⭐' }, { root: true }),
    createThread({ commit, state, rootState }, { text, title, forumId }) {
      return new Promise((resolve, reject) => {
        const threadId = firebase.database().ref('threads').push().key;
        const postId = firebase.database().ref('posts').push().key;
        const userId = rootState.auth.authId;
        const publishedAt = Math.floor(Date.now() / 1000);
        const thread = {
          forumId,
          title,
          userId,
          publishedAt,
          firstPostId: postId,
          posts: {}
        }
        thread.posts[postId] = postId //2.通过设置父对象
        const post = { text, publishedAt, threadId, userId }
        const updates = {}
        updates[`threads/${threadId}`] = thread //1. 不能同时设置父子路径
        updates[`forums/${forumId}/threads/${threadId}`] = threadId
        updates[`users/${userId}/threads/${threadId}`] = threadId
        updates[`posts/${postId}`] = post
        // updates[`threads/${threadId}/posts/${postId}`] = postId
        updates[`users/${userId}/posts/${postId}`] = postId

        firebase.database().ref().update(updates).then(() => {
          //update thread
          commit('setItem', { resource: 'threads', item: thread, id: threadId }, { root: true })
          commit('forums/appendThreadToForum', { childId: threadId, parentId: forumId }, { root: true })
          commit('users/appendThreadToUser', { childId: threadId, parentId: userId }, { root: true })
          //update post
          commit('setItem', { resource: 'posts', item: post, id: postId }, { root: true })
          //append post to thread
          commit('appendPostToThread', { childId: postId, parentId: post.threadId })
          //append post to user
          commit('users/appendPostToUser', { childId: postId, parentId: post.userId }, { root: true })
          resolve(threadId)
        })
      })
    },
    updateThread({ state, commit, rootState }, { text, title, threadId }) {
      return new Promise((resolve, reject) => {
        const thread = state.items[threadId];
        const post = state.items[thread.firstPostId];
        const edited = {
          at: Math.floor(Date.now() / 1000),
          by: rootState.auth.authId
        }
        const updates = {}
        updates[`posts/${thread.firstPostId}/text`] = text
        updates[`posts/${thread.firstPostId}/edited`] = edited
        updates[`threads/${threadId}/title`] = title
        firebase.database().ref().update(updates).then(() => {
          commit('setThread', { thread: { ...thread, title }, threadId: threadId })
          commit('posts/setPost', {
            postId: thread.firstPostId,
            post: {
              ...post,
              text,
              edited
            }
          }, { root: true })
          resolve(threadId)
        }).catch((e) => {
          reject(e)
        })
      });
    },
    fetchThread: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'threads', id, emoji: '🎉' }, { root: true })
  }
}
