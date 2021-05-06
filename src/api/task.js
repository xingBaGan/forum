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
  },
  fetchTaskByUserId(userId) {
    return $api.tasks.getTaskByUserId(userId).then((res) => {
      if (!res.data[0]) {
        $api.tasks.newTask({ userId: userId, checkInData: [], points: 0 }).then((res) => {
         return Promise.resolve(res.data[0])
        })
      }
      return Promise.resolve(res.data[0])
    })
  }
}
