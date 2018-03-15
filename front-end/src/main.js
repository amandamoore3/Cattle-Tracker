import App from './App.vue';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import route from './router';
import Vue from 'vue';
import vueRouter from 'vue-router';
import "./stylesheets/style.scss";

Vue.use(vueRouter);

const vm = new Vue({
  el: '#app',
  router: route,
  render: h => h(App)
})

window.onload = function() {
  vm.$mount('#app');
}