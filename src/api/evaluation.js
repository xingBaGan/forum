import Vue from 'vue'
import firebase from 'firebase'
export default {
  getEvaluations() {
    return Vue.prototype.$axios.get('/evaluations');
  },
  getEvaluationById(id) {
    return Vue.prototype.$axios.get(`/evaluations/${id}`);
  },
  getEvaluationByPostId(postId) {
    return Vue.prototype.$axios.get(`/evaluations?postId=${postId}`);
  },
   getEvaluationByGameId(gameId) {
    return Vue.prototype.$axios.get(`/evaluations?gameId=${gameId}`).then(res => {
      let all = Promise.all(res.data.map(evaluation => {//将每个评论对应的文章内容查找
        return firebase.database().ref(`/posts/${evaluation.postId}`)
      }))
      return {
        "postResolved":all
          ,
        "evaluations":res.data
      }
    })
  },
  createEvaluation(payload){
    //{userId,content,publishedAt,threadId,id} to post 
    let postId = firebase.database().ref('posts').push().key;
    
//{postId,star,hours,gameId}
    return Vue.prototype.$axios.post(`/evaluations`,payload)
  }
}
