import App from './App.vue';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import route from './router';
import Vue from 'vue';
import vueRouter from 'vue-router';
import "./scss/style.scss";


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