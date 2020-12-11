
import Vue from 'vue'
export default {
  setItem(state, { resource, id, item }) {
    //posts,users,threads
    Vue.set(state[resource].items, id, item);
  }
}
