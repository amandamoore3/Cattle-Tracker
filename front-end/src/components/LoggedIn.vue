<template>
<div>
  <router-link to="/cattle">Herd data</router-link>
  <h1>Logged in!</h1>
  <button @click='logOut'>Log out</button><br />

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
        this.$router.push('/');
      }
    });
  }


}
</script>
