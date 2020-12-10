import firebase from 'firebase'
import 'firebase/firebase-database'
import { removeEmptyProperties } from '@/utils'
export default {
  createPost({ state, commit }, post) {
    let postId = firebase.database().ref('posts').push().key;
    post.userId = state.authId;
    post.publishedAt = Math.floor(Date.now() / 1000);
    const updates = {}
    updates[`posts/${postId}`] = post
    updates[`threads/${post.threadId}/posts/${postId}`] = postId
    updates[`threads/${post.threadId}/contributors/${post.userId}`] = post.userId
    updates[`users/${post.userId}/posts/${postId}`] = postId
    firebase.database().ref().update(updates).then(() => {
      //set post
      commit('setItem', { resource: 'posts', item: post, id: postId })
      //append post to thread
      commit('appendPostToThread', { childId: postId, parentId: post.threadId })
      commit('appendContributorToThread', { childId: post.userId, parentId: post.threadId })
      //append post to user
      commit('appendPostToUser', { childId: postId, parentId: post.userId })
      return Promise.resolve(postId)
    })
  },
  updatePost({ state, commit }, { id, text }) {
    return new Promise((resolve, reject) => {
      const post = state.posts[id];
      const edited = {
        at: Math.floor(Date.now() / 1000),
        by: state.authId
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
  createUser({ state, commit }, { id, email, name, username, password, avatar = null }) {
    return new Promise((resolve, reject) => {
      const registeredAt = Math.floor(Date.now() / 1000)
      const usernameLower = username.toLowerCase()
      email = email.toLowerCase()
      const user = { avatar, email, name, username, password, usernameLower, registeredAt }
      // const userId = firebase.database().ref('users').push().key
      // console.log(id)
      firebase.database().ref('users').child(id).set(user)
        .then(() => {
          commit('setItem', { resource: 'users', id: id, item: user })
          resolve(state.users[id])
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
  fetchAuthUser({ dispatch, commit }) {
    const userId = firebase.auth().currentUser.uid
    console.log("userId" + userId)
    if (!userId) return null;
    return new Promise((resolve, reject) => {
      // check if user exists in the database
      firebase.database().ref('users').child(userId).once('value', snapshot => {
        if (snapshot.exists()) {
          return dispatch('fetchUser', { id: userId })
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
        return dispatch("createUser", { id: data.user.uid, email, name, username, password, avatar })
      })
  },
  createThread({ commit, state, dispatch }, { text, title, forumId }) {
    return new Promise((resolve, reject) => {
      const threadId = firebase.database().ref('threads').push().key;
      const postId = firebase.database().ref('posts').push().key;
      const userId = state.authId;
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
        commit('setItem', { resource: 'threads', item: thread, id: threadId })
        commit('appendThreadToForum', { childId: threadId, parentId: forumId })
        commit('appendThreadToUser', { childId: threadId, parentId: userId })
        //update post
        commit('setItem', { resource: 'posts', item: post, id: postId })
        //append post to thread
        commit('appendPostToThread', { childId: postId, parentId: post.threadId })
        //append post to user
        commit('appendPostToUser', { childId: postId, parentId: post.userId })
        resolve(threadId)
      })
    })
  },
  updateThread({ state, commit, dispatch }, { text, title, threadId }) {
    return new Promise((resolve, reject) => {
      const thread = state.threads[threadId];
      const post = state.posts[thread.firstPostId];
      const edited = {
        at: Math.floor(Date.now() / 1000),
        by: state.authId
      }
      const updates = {}
      updates[`posts/${thread.firstPostId}/text`] = text
      updates[`posts/${thread.firstPostId}/edited`] = edited
      updates[`threads/${threadId}/title`] = title
      firebase.database().ref().update(updates).then(() => {
        commit('setThread', { thread: { ...thread, title }, threadId: threadId })
        commit('setPost', {
          postId: thread.firstPostId,
          post: {
            ...post,
            text,
            edited
          }
        })
        resolve(threadId)
      })
    });
  },
  fetchItem: ({ state, commit }, { id, emoji, resource }) => {
    console.log('🔥 ', emoji, id)
    return new Promise((resolve, reject) => {
      firebase.database().ref(resource).child(id).once('value', snapshot => {
        const item = snapshot.val()
        commit('setItem', { resource, item, id: snapshot.key })
        resolve(state[resource][id])
      }).catch(err => {
        console.log(err)
      })
    })
  },
  signInWithEmailAndPassword(context, { email, password }) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  },
  signOut({ commit }) {
    return firebase.auth().signOut().then(() => {
      commit('setAuthId', null)
    })
  },
  fetchItems: ({ dispatch }, { ids, emoji, resource }) => Promise.all(ids.map(id => dispatch('fetchItem', { id, resource, emoji }))),
  fetchThread: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'threads', id, emoji: '🎉' }),
  fetchUser: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'users', id, emoji: '🙋' }),
  fetchPost: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'posts', id, emoji: '📮' }),
  fetchForum: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'forums', id, emoji: '🎭' }),
  fetchForums: ({ dispatch }, { ids }) => dispatch('fetchItems', { resource: 'forums', ids, emoji: '🔰' }),
  fetchPosts: ({ dispatch }, { ids }) => dispatch('fetchItems', { resource: 'posts', ids, emoji: 'posts' }),
  fetchCategory: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'categories', id, emoji: 'category' }),
  fetchThreads: ({ dispatch }, { ids }) => dispatch('fetchItems', { resource: 'threads', ids, emoji: '⭐' }),
  fetchCategories: ({ state, commit }) => {
    console.log('🔥 📓', 'categories')
    return new Promise((resolve) => {
      firebase.database().ref('categories').once('value', snapshot => {
        const categories = snapshot.val()
        Object.keys(categories).forEach(categoryId => {
          const category = categories[categoryId]
          commit('setItem', { resource: 'categories', id: categoryId, item: category })
        })
        resolve(Object.values(state.categories))
      })
    })
  }
}
