import Vue from 'vue'
import firebase from 'firebase'
export default {
  newTask(task) {
    return Vue.prototype.$axios.post('/tasks',task)
  },
  getTaskByUserId(userId) {
   return Vue.prototype.$axios.get(`/tasks?userId=${userId}`);
  },
  checkIn(task) {
    return Vue.prototype.$axios.patch(`/tasks/${task.id}`, task);
  }
}
