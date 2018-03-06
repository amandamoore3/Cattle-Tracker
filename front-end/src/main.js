import App from './App.vue';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import route from './router';
import Vue from 'vue';
import vueRouter from 'vue-router';
import "./stylesheets/style.scss";



Vue.use(vueRouter);
// Vue.prototype.$userID = firebase.auth().currentUser

new Vue({
  el: '#app',
  router: route,
  data() {
    return {
      uid: ""
    }
  },
  beforeCreate() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid);

        // console.log($userID);
        // this.uid = user.uid
        //capture user id and push to uid array.  add user id to each schema. capture uid and add to object sent to db.
      } else {
        this.$router.push('/login');
      }
    })
  },
  render: h => h(App)
})