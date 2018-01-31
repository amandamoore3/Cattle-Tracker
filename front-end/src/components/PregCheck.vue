<template lang="html">
<div>
    <h1>{{msg}}</h1>
    <button @click='logOut'>Log out</button><br />
    <table class="table table table-striped table-hover">
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
        <td>{{pregCheck.tag_id}}</td>
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
