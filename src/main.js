// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './plugins/axios'
import App from './App'
import router from './router'
import AppDate from '@comp/AppDate'
import store from './store'
import firebase from 'firebase/app'
import 'firebase/firebase-database'
import Vuelidate from 'vuelidate'
import rate from 'vue-rate'
import 'vue-rate/dist/vue-rate.css'
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
import VModal from 'vue-js-modal'
import Vuecheckin from 'vue-checkin'
Vue.use(VModal, { dialog: true })
Vue.use(VueQuillEditor, {
  placeholder: '输入评论',
  // readOnly: true,
  theme: 'snow'
})

Vue.config.productionTip = false
Vue.component('AppDate', AppDate)
/* eslint-disable no-new */
Vue.use(Vuelidate)
Vue.use(rate)
Vue.use(Vuecheckin)
var firebaseConfig = {
  apiKey: "AIzaSyBmjJWvDgEuRWryS2f9NZzDRiXkZpQASbc",
  authDomain: "vue-school-forum-69951.firebaseapp.com",
  databaseURL: "https://vue-school-forum-69951-default-rtdb.firebaseio.com",
  projectId: "vue-school-forum-69951",
  storageBucket: "vue-school-forum-69951.appspot.com",
  messagingSenderId: "627125751190",
  appId: "1:627125751190:web:79ac5cd83c9f971ad021b7"
  // apiKey: process.env.FIREBASE_API_KEY,
  // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.FIREBASE_DATA_BASEURL,
  // projectId: process.env.FIREBASE_PROJECT_ID,
  // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  store,
  components: { App }
})
