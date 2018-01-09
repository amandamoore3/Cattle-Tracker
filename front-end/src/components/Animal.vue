<template lang="html">
  <div id="app">
    <h1>{{msg}}</h1>
    <router-link :to="{path: '/'}">Back to herd information</router-link>
    {{cow.tag}}
    {{cow.type}}
    {{cow.pasture}}

    {{breeding.date}}
    {{breeding.method}}
    {{breeding.bull}}
    {{health.diagnosis}}
    {{pregnancy.result}}



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
      cow: [],
      breeding: [],
      health: [],
      pregnancy: []
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
    // let thisApp = this;
    axios.get('http://127.0.0.1:3000/cattle/' + this.$route.params.id)
      .then((response) => {
        this.cow = response.data
      });
    axios.get('http://127.0.0.1:3000/breeding/' + this.$route.params.id)
      .then((response) => {
        this.breeding = response.data[0]
      });
    axios.get('http://127.0.0.1:3000/health/' + this.$route.params.id)
      .then((response) => {
        this.health = response.data[0]
      });
    axios.get('http://127.0.0.1:3000/pregnancy/' + this.$route.params.id)
      .then((response) => {
        this.pregnancy = response.data[0]
      });
  }
}
</script>

<style lang="css">
</style>
