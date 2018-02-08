<template lang="html">
<div>
    <h4>{{msg}}</h4>
    <h1>Sold cattle</h1>
    <table class="table table table-striped table-hover">
    <thead>
      <tr>
        <th>Ear tag</th>
        <th>Date</th>
        <th>Status</th>
        <th>Weight</th>
        <th>Comments</th>
        <th>Edit</th>
      </tr>
    </thead>
    <tbody>
      <tr  v-for="cow in cows" v-if="cow.status =='Sold'">
        <td>{{cow.tag_id}}</td>
        <td>{{cow.status_date}}</td>
        <td>{{cow.status}}</td>
        <td>{{cow.weight}}</td>
        <td>{{cow.status_comments}}</td>
        <td><router-link :to="{path: '/outcomes/' + cow.tag_id}"><i class="fa fa-2x fa-pencil"></i></router-link></td>
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
        <th>Edit</th>
      </tr>
    </thead>
    <tbody>
      <tr  v-for="cow in cows" v-if="cow.status =='Deceased'">
        <td>{{cow.tag_id}}</td>
        <td>{{cow.status_date}}</td>
        <td>{{cow.status}}</td>
        <td>{{cow.causeOfDeath}}</td>
        <td>{{cow.status_comments}}</td>
        <td><router-link :to="{path: '/outcomes/' + cow.tag_id}"><i class="fa fa-2x fa-pencil"></i></router-link></td>
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
    axios.get('http://127.0.0.1:3000/cattle')
      .then((response) => {
        this.cows = response.data
      });
  }


}
</script>

<style lang="css">


</style>
