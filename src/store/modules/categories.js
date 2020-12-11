
import { OBTreeToArrayWithId } from '@/utils'
import firebase from 'firebase'
export default {
  state: {
    items: {}
  },
  getters: {
    categoriesWithId(state) {
      return OBTreeToArrayWithId(state.items);
    }
  },
  mutations: {

  },
  actions: {
    fetchAllCategories({ state, commit }) {
      console.log('🔥', '🏷', 'all')
      return new Promise((resolve, reject) => {
        firebase.database().ref('categories').once('value', snapshot => {
          const categoriesObject = snapshot.val()
          Object.keys(categoriesObject).forEach(categoryId => {
            const category = categoriesObject[categoryId]
            commit('setItem', { resource: 'categories', id: categoryId, item: category }, { root: true })
          })
          resolve(Object.values(state.items))
        })
      })
    },
    fetchCategory: ({ dispatch }, { id }) => dispatch('fetchItem', { resource: 'categories', id, emoji: 'category' }, { root: true }),
    fetchCategories: ({ dispatch }, { ids }) => dispatch('fetchItems', { resource: 'categories', ids, emoji: 'category' }, { root: true })
  },
  namespaced: true
}
