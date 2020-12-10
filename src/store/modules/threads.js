export default {
  namespaced: true,
  state: {
    items: {}
  },
  getters: {
    threadsWithId(state) {
      return OBTreeToArrayWithId(state.threads);
    },
    threadRepliesCount: (state) => (id) => countObjectProperties(state.threads[id].posts) - 1

  },
  mutations: {},
  actions: {},
  names
}
