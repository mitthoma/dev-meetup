import Vue from 'vue'
import App from './App.vue'
// import { initializeApp } from 'firebase/app';
// import { getAuth, onAuthStateChanged } from 'firebase/auth'
import router from './router'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import vuetify from './plugins/vuetify'
import { store } from './store'
import AlertComponent from './components/Shared/Alert.vue'
import EditMeetupDetailsDialog from './components/Meetup/Edit/EditMeetupDetailsDialog.vue'
import EditMeetupDateDialog from './components/Meetup/Edit/EditMeetupDateDialog.vue'
import RegisterDialog from './components/Meetup/Registration/RegisterDialog.vue'
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import DateFilter from './filters/date'

Vue.filter('date', DateFilter)
// import VueFilterDateFormat from 'vue-filter-date-format';

Vue.config.productionTip = false
// Vue.use(VueFilterDateFormat)

Vue.component('app-alert', AlertComponent);
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog)
Vue.component('app-edit-meetup-date-dialog', EditMeetupDateDialog)
Vue.component('app-meetup-register-dialog', RegisterDialog)



new Vue({
  vuetify,
  router,
  store,

  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: "AIzaSyDuC_RjUWcbxW68GXLK6fcoTcv0-22T4oA",
      authDomain: "dev-meetup-9fc7a.firebaseapp.com",
      projectId: "dev-meetup-9fc7a",
      storageBucket: "gs://dev-meetup-9fc7a.appspot.com",
      messagingSenderId: "639849133376",
      appId: "1:639849133376:web:51e627baaa1a546b97f6a5",
      measurementId: "${config.measurementId}",
      databaseUrl: 'https://dev-meetup-9fc7a-default-rtdb.firebaseio.com/'
    })
    // firebase.auth().onAuthStateChanged()
    // const auth = getAuth(firebase)
    // onAuthStateChanged(auth, user => {
    //   if (user) {
    //     this.$store.dispatch('autoSignIn', user)
    //   }
    // })
    // this.$store.dispatch('loadMeetups')
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadMeetups')
  }
}).$mount('#app')