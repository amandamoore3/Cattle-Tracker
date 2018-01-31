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
        <th>Bull</th>
        <!-- <th>Edit</th> -->
      </tr>
    </thead>
    <tbody>

      <tr  v-for="breeding in breedings" >
        <td>{{breeding.tag_id}}</td>
        <td>{{breeding.date}}</td>
        <td>{{breeding.method}}</td>
        <td>{{breeding.bull}}</td>

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
      msg: 'All Breeding Info',
      breedings: []
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
    axios.get('http://127.0.0.1:3000/breeding')
      .then((response) => {
        this.breedings = response.data
      });
  }


}
</script>

<style lang="css">


</style>
