import { OBTreeToArrayWithId, countObjectProperties } from '@/utils'
export default {
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
}
