import firebase from 'firebase'
import firebaseui from 'firebaseui'
import Vue from 'vue'
import App from './App.vue'
import vueRouter from 'vue-router';
import route from './router';

Vue.use(vueRouter);

new Vue({
  el: '#app',
  router: route,
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // this.$router.push('/loggedin');
      } else {
        // this.$router.push('/');
      }
    });
  },
  render: h => h(App)
})
