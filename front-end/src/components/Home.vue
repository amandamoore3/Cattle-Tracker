<template>
<div class="text-center">
  <h2 class="home-header is-primary">Let us help you track your show cattle</h2>
  <h6 class="home-text">To get started, add all animals on the active cattle table. From there, you can track health records, calving seasons, preg-checks and more on their respective tables.</h6>
  <router-link :to="{ path: '/cattle'}"><button class="btn btn-primary m-2">Start tracking</button></router-link>
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
      name: 'hello',
      email: ''
    }
  },
  methods: {
    logOut() {
      firebase.auth().signOut();
      window.location.href = '/';
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.name = firebase.auth().currentUser.displayName;
        this.email = firebase.auth().currentUser.email;
      } else {
        this.$router.push('/login');
      }
    });
  }


}
</script>
