<template lang="html">
  <div id="app">
    <h1>{{msg}}</h1>
    <router-link :to="{path: '/'}">Back to list</router-link>
    {{cow.tag}}
    {{cow.type}}
    {{cow.pasture}}
    {{cow.dob}}

  </div>
</template>

<script>
import axios from 'axios';
import firebase from 'firebase';

export default {
  name: 'app',
  data() {
    return {
      msg: 'Individual animal view',
      cow: []
    }
  },
  beforeCreate() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {} else {
        this.$router.push('/');
      }
    })
  },
  created() {
    axios.get('http://127.0.0.1:3000/cattle/' + this.$route.params.id)
      .then((response) => {
        // console.log("response:" + response);
        this.cow = response.data
      })
  }
}
</script>

<style lang="css">
</style>
