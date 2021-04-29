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
  createEvaluation(payload) {
    let postId = firebase.database().ref('posts').push().key;
    let { userId, content, publishedAt,  hours, gameId,star} = payload
    let post = { userId, content, publishedAt};
    post.isEvaluation = 1;
    const updates = {}
    updates[`posts/${postId}`] = post
    //{userId,content,publishedAt,id} to post
    return firebase.database().ref().update(updates).then(() => {
      //{postId,star,hours,gameId}
      Vue.prototype.$axios.post(`/evaluations`, { postId, star, hours, gameId })
    })
  },
  updateEvaluation({ star, hours, content, postId, id } = payload) {
    // console.log({ star, hours, content, postId, id })
    return firebase.database().ref("posts").child(postId).get().then(function (snapshot) {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        return firebase.database().ref(`posts/${postId}`).set({ ...snapshot.val(), content }).then(() => {
          Vue.prototype.$axios.patch(`/evaluations/${id}`, { star, hours })
        })
      }
      else {
        console.log("No data available");
      }
    }).catch(function (error) {
      console.error(error);
    });

  }
}
