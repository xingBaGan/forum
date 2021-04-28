// import Vue from 'vue'
import firebase from 'firebase'
export default {
  getUserById(userId) {
    return firebase.database().ref(`/users/${userId}`)
  }
}
