<template lang="html">
<div>
    <h1>{{msg}}</h1>
    <button @click='logOut'>Log out</button><br />
    <table class="cattleTable table table table-striped table-hover">
    <thead>
      <tr>
        <th>Pasture</th>
        <th>Total #</th>
      </tr>
    </thead>
    <tbody>

      <tr  v-for="pasture in pastures">
        <td>{{pasture.name}}</td>
        <td>Sum of animals on pasture</td>
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
      pastures: []
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
      })
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

.cattleTable {
  margin: 0 auto;
}
</style>
