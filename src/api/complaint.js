import Vue from 'vue'
import firebase from 'firebase'
export default {
  getComplaints() {
    return Vue.prototype.$axios.get('/complaints');
  },
  getComplaintById(id) {
    return Vue.prototype.$axios.get(`/complaints/${id}`);
  },
  getComplaintByPostId(PostId) {
    return Vue.prototype.$axios.get(`/complaints?PostId=${PostId}`);
  },
  createComplaint(complaint) {
    return Vue.prototype.$axios.post('/complaints', complaint).then((res) => {
      return firebase.database().ref(`posts/${complaint.postId}`).get().then((snapshot)=>{//查找post 下userId
        let userId = snapshot.val().userId;
        firebase.database().ref(`/users/${userId}/complaints/${res.data.id}`).set(res.data.id)//更新complaints
         return Promise.resolve()
       })
    })
  },
  updateComplaintById(id, complaint) {
    return Vue.prototype.$axios.patch(`/complaints/${id}`, complaint);
  },
  confirmComplaintByUserId({ id,userId,status}) {
    // this.
    return Vue.prototype.$axios.get(`/complaints/${id}`);
  }
}
