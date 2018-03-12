<template>
<div class="text-center">
  <h2 class="home-header is-primary">Let us help you track your show cattle</h2>
  <h6 class="home-text">To get started, add all animals on the active cattle table. From there, you can track health records, calving seasons, preg-checks and more on their respective tables.</h6>
  <template v-if="user">
    <router-link :to="{ name: 'cattle', params:{user}}"><button class="btn btn-primary m-2">Start tracking</button></router-link>
  </template>
  <template v-else>
    <router-link :to="{ name: 'login'}"><button class="btn btn-primary m-2">Login</button></router-link>
  </template>

  <div class="fullScreenImageContainer">
    <div class="fullScreenImage"></div>
  </div>
</div>
</template>

<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      user: null
      // email: ''
    }
  },
  // beforeCreate() {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //
  //       // console.log(this.user);
  //       // this.email = firebase.auth().currentUser.email;
  //     } else {
  //       this.$router.push('/login');
  //     }
  //   });
  // },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      // if (user) {
      this.user = firebase.auth().currentUser.uid;
      // } else {
      //   this.$router.push('/login');
      // }
    });
  }
}
</script>
