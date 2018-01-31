<template lang="html">
<div>
    <h1>{{msg}}</h1>
    <button @click='logOut'>Log out</button><br />
    <h1>Sold cattle</h1>
    <table class="table table table-striped table-hover">
    <thead>
      <tr>
        <th>Ear tag</th>
        <th>Date</th>
        <th>Status</th>
        <th>Weight</th>
        <th>Comments</th>
      </tr>
    </thead>
    <tbody>
      <tr  v-for="outcome in outcomes" v-if="outcome.status =='Sold'">
        <td>{{outcome.tag_id}}</td>
        <td>{{outcome.date}}</td>
        <td>{{outcome.status}}</td>
        <td>{{outcome.weight}}</td>
        <td>{{outcome.comments}}</td>
      </tr>
    </tbody>
  </table>

  <h1>Deaths</h1>
  <table class="table table table-striped table-hover">
  <thead>
    <tr>
      <th>Ear tag</th>
      <th>Date</th>
      <th>Status</th>
      <th>Cause of Death</th>
      <th>Comments</th>
    </tr>
  </thead>
  <tbody>
    <tr  v-for="outcome in outcomes" v-if="outcome.status =='Deceased'">
      <td>{{outcome.tag_id}}</td>
      <td>{{outcome.date}}</td>
      <td>{{outcome.status}}</td>
      <td>{{outcome.causeOfDeath}}</td>
      <td>{{outcome.comments}}</td>
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
      msg: 'Outcomes',
      outcomes: []
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
    axios.get('http://127.0.0.1:3000/outcomes')
      .then((response) => {
        this.outcomes = response.data
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


</style>
