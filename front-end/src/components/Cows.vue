<template lang="html">
<div>
    <h1>{{msg}}</h1>
    <button @click='logOut'>Log out</button><br />
    <!-- <div class="card" v-for="cow in cows">

        {{cow.tag}} <br />
        {{cow.type}}  <br />
        {{cow.pasture}} <br />

  </div> -->
    <table class="table is-fullwidth is-striped is-hoverable">
    <thead>
      <tr>
        <th>Ear Tag</th>
        <th>Type</th>
        <th>Pasture</th>
        <th>Birth Date</th>
        <!-- <th>Edit</th> -->
      </tr>
    </thead>
    <tbody>

      <tr  v-for="cow in cows" v-if="cow.status =='Active'" >
        <td>{{cow.tag}}</td>
        <td>{{cow.type}}</td>
        <td>{{cow.pasture}}</td>
        <td>{{cow.dob}}</td>
        <!-- <td><a class="button" @click="openModal(cow)">Edit this movie</a></td> -->
      </tr>

    </tbody>
  </table>

</div>
</template>

<script>
import axios from 'axios';
import 'bulma/css/bulma.css';
import firebase from 'firebase';

export default {
  data() {
    return {
      msg: 'Active cattle',
      cows: []
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
    axios.get('http://127.0.0.1:3004/cattle')
      .then((response) => {
        // console.log("response:" + response);
        this.cows = response.data
      })
  }


}
</script>

<style lang="css">
</style>
