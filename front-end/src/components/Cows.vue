<template lang="html">
<div>
    <h1>{{msg}}</h1>
    <button @click='logOut'>Log out</button><br />
    <button @click=''>Add</button>
    <table class="cattleTable table table-striped table-hover">
    <thead>
      <tr>
        <th>Ear Tag</th>
        <th>Type</th>
        <th>Pasture</th>
        <th>Birth Date</th>
        <!-- <th>Edit</th> -->
        <th>More Information</th>
      </tr>
    </thead>
    <tbody>

      <tr  v-for="cow in cows" v-if="cow.status =='Active'" >
        <td>{{cow.tag_id}}</td>
        <td>{{cow.type}}</td>
        <td>{{cow.pasture}}</td>
        <td>{{cow.dob}}</td>
        <!-- <td><a class="button" @click="openModal(cow)">Edit this cow</a></td> -->
        <!-- <td><a class="delete is-large" @click="deleteCow(cow)"></a></td> -->
        <td><router-link :to="{path: '/cattle/' + cow.tag_id}"><span class="icon"><i class="fa fa-2x fa-chevron-circle-right"></i></span></router-link></td>
<!--  -->
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
      msg: 'Active cattle',
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
