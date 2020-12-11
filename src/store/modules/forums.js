import { makeAppendChildToParentMutation } from '@/store/assetHelpers'
import { OBTreeToArrayWithId } from '@/utils'
export default {
  state: {
    items: {}
  },
  getters: {
    forumsWithId(state) {
      return OBTreeToArrayWithId(state.items);
    }
  },
  mutations: {
    appendThreadToForum: makeAppendChildToParentMutation({ parent: 'forums', child: 'threads' })
  },
  actions: {
    fetchForum: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'forums', id, emoji: '🎭' }, { root: true }),
    fetchForums: ({ dispatch }, { ids }) => dispatch('fetchItems', { resource: 'forums', ids, emoji: '🔰' }, { root: true })
  },
  namespaced: true
}
