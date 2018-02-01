<template lang="html">
<div>
    <h1>{{msg}}</h1>
    <button @click='logOut'>Log out</button><br />
    <table class="table table table-striped table-hover">
    <thead>
      <tr>
        <th>Pasture</th>
        <th>Total #</th>
      </tr>
    </thead>
    <tbody>

      <tr  v-for="pasture in pastures" >
        <td>{{pasture.name}}</td>
        <td  v-for="cow in cows"  v-if="cow.status =='Active' && cow.pasture == pasture.name">{{cows.length}}</td>
      </tr>

    </tbody>
  </table>


</div>
</template>

<script>
import axios from 'axios';
import firebase from 'firebase';

export default {
  data() {
    return {
      msg: 'Pastures',
      pastures: [],
      cows: []
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
    axios.get('http://127.0.0.1:3000/pastures')
      .then((response) => {
        this.pastures = response.data
      });
    axios.get('http://127.0.0.1:3000/cattle')
      .then((response) => {
        this.cows = response.data
      });
  },
  methods: {
    logOut() {
      firebase.auth().signOut();
      window.location.href = '/';
    }
  }


}
</script>

<style lang="css">


</style>
