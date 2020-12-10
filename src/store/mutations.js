
import Vue from 'vue'
const makeAppendChildToParentMutation = ({ parent, child }) => {
  return (state, { childId, parentId }) => {
    const resource = state[parent][parentId];
    if (!resource[child]) {
      Vue.set(resource, child, {})
    }
    Vue.set(resource[child], childId, childId);
  }
}
export default {
  setPost(state, { post, postId }) {
    Vue.set(state.posts, postId, post)
  },
  setUser(state, { user, userId }) {
    Vue.set(state.users, userId, user)
  },
  setThread(state, { thread, threadId }) {
    Vue.set(state.threads, threadId, thread)
  },
  setAuthId(state, id) {
    state.authId = id
  },
  setItem(state, { resource, id, item }) {
    //posts,users,threads
    Vue.set(state[resource], id, item);
  },
  appendPostToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'posts' }),
  appendPostToUser: makeAppendChildToParentMutation({ parent: 'users', child: 'posts' }),
  appendContributorToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'contributors' }),
  appendThreadToForum: makeAppendChildToParentMutation({ parent: 'forums', child: 'threads' }),
  appendThreadToUser: makeAppendChildToParentMutation({ parent: 'users', child: 'threads' })
}
