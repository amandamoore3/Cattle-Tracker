<template lang="html">
<div>
    <h1>{{msg}}</h1>
    <button @click='logOut'>Log out</button><br />
    <table class="breedingTable table is-striped is-hoverable">
    <thead>
      <tr>
        <th>Ear Tag</th>
        <th>Treatment Date</th>
        <th>Medication</th>
        <th>Dosage</th>
        <th>Diagnosis</th>
        <th>Booster Date</th>
        <!-- <th>Edit</th> -->
      </tr>
    </thead>
    <tbody>

      <tr  v-for="healthEvent in healthEvents" >
        <!-- ear tag data to come from cattle table -->
        <td>TBD</td>
        <td>{{healthEvent.treatmentDate}}</td>
        <td>{{healthEvent.medication}}</td>
        <td>{{healthEvent.dosage}}</td>
        <td>{{healthEvent.diagnosis}}</td>
        <td>{{healthEvent.booster}}</td>

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
      msg: 'All Health Info',
      healthEvents: []
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
    axios.get('http://127.0.0.1:3000/health')
      .then((response) => {
        this.healthEvents = response.data
      });
  }


}
</script>

<style lang="css">
.breedingTable {
  margin: 0 auto;
}

</style>
