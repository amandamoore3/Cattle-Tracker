<template>
<div>
  <div v-bind:style="{ backgroundImage: 'url(' + '/static/IMG_3283.jpg' + ')' }" class="fullScreenImage">

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
        this.$router.push('/');
      }
    });
  }


}
</script>
