<template lang="html">
<div>
    <h1>{{msg}}</h1>
    <button @click='logOut'>Log out</button><br />
    <table class="breedingTable table is-striped is-hoverable">
    <thead>
      <tr>
        <th>Ear Tag</th>
        <th>Date</th>
        <th>Method</th>
        <th>Result</th>

      </tr>
    </thead>
    <tbody>

      <tr  v-for="pregCheck in pregChecks" >
        <td>TBD</td>
        <td>{{pregCheck.date}}</td>
        <td>{{pregCheck.method}}</td>
        <td>{{pregCheck.result}}</td>

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
      msg: 'All Preg-check Info',
      pregChecks: []
    }
  },
  methods: {
    logOut() {
      firebase.auth().signOut();
      window.location.href = '/';
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
    axios.get('http://127.0.0.1:3000/pregnancy')
      .then((response) => {
        this.pregChecks = response.data
      });
  }


}
</script>

<style lang="css">
.breedingTable {
  margin: 0 auto;
}

</style>
