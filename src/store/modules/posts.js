import Vue from 'vue'
import firebase from 'firebase'
import { OBTreeToArrayWithId } from '@/utils'
export default {
  state: {
    items: {}
  },
  getters: {
    postsWithId(state) {
      return OBTreeToArrayWithId(state.items);
    }
  },
  mutations: {
    setPost(state, { post, postId }) {
      Vue.set(state.items, postId, post)
    }
  },
  actions: {
    createPost({ state, commit, rootState }, post) {
      let postId = firebase.database().ref('posts').push().key;
      post.userId = rootState.auth.authId;
      post.publishedAt = Math.floor(Date.now() / 1000);
      const updates = {}
      updates[`posts/${postId}`] = post
      updates[`threads/${post.threadId}/posts/${postId}`] = postId
      updates[`threads/${post.threadId}/lastPostId`] = postId
      updates[`threads/${post.threadId}/lastPostAt`] = Math.floor(Date.now() / 1000)
      updates[`threads/${post.threadId}/contributors/${post.userId}`] = post.userId
      updates[`forums/${rootState.threads.items[post.threadId].forumId}/lastPostId`] = postId
      updates[`users/${post.userId}/posts/${postId}`] = postId
      firebase.database().ref().update(updates).then(() => {
        //set post
        commit('setItem', { resource: 'posts', item: post, id: postId }, { root: true })
        //append post to thread
        commit('threads/appendPostToThread', { childId: postId, parentId: post.threadId }, { root: true })
        commit('threads/appendContributorToThread', { childId: post.userId, parentId: post.threadId }, { root: true })
        //append post to user
        commit('users/appendPostToUser', { childId: postId, parentId: post.userId }, { root: true })
        return Promise.resolve(postId)
      })
    },
    updatePost({ state, commit, rootState }, { id, text }) {
      return new Promise((resolve, reject) => {
        const post = state.items[id];
        const edited = {
          at: Math.floor(Date.now() / 1000),
          by: rootState.auth.authId
        }

        const updates = { text, edited }
        firebase.database().ref('posts').child(id).update(updates).then(() => {
          commit('setPost', {
            postId: id,
            post: {
              ...post,
              text,
              edited
            }
          })
          resolve(id)
        })
      });
    },
    fetchPost: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'posts', id, emoji: '📮' }, { root: true }),
    fetchPosts: ({ dispatch }, { ids }) => dispatch('fetchItems', { resource: 'posts', ids, emoji: 'posts' }, { root: true })
  },
  namespaced: true
}
