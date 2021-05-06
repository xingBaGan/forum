import Vue from 'vue'
import firebase from 'firebase'
export default {
  getReplyByReplyId(replyId) {
    return firebase.database().ref(`posts/${replyId}`).get();
  },
  getRepliesByReplyIds({ ids }) {
    if (!ids.length) return Promise.resolve([])
    return Promise.all(ids.map(id => {
      return this.getReplyByReplyId(id)
    }))
  },
  postReply({repliedPostId, userId, content }) {
    let post = {};
    let postId = firebase.database().ref('posts').push().key;
    post.userId = userId;
    post.content = content;
    post.publishedAt = Math.floor(Date.now() / 1000);
    const updates = {}
    updates[`posts/${postId}`] = post
    updates[`posts/${repliedPostId}/replies/${postId}`] = postId
    return firebase.database().ref().update(updates);
  },

}
