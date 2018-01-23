<template lang="html">
  <div id="app">
    <h1>{{msg}}</h1>
    <router-link :to="{path: '/'}">Back to herd information</router-link>
    <h5> Animal information</h5>

    <table class="cattleTable table is-striped is-hoverable">
    <thead>
      <tr>
        <th>Ear Tag</th>
        <th>Type</th>
        <th>Pasture</th>
        <th>Birth Date</th>
      </tr>
    </thead>
    <tbody>

      <tr >
        <td>{{cow.tag_id}}</td>
        <td>{{cow.type}}</td>
        <td>{{cow.pasture}}</td>
        <td>{{cow.dob}}</td>
      </tr>

    </tbody>
  </table>




    </br>
    <h5> Breeding information</h5>
    <table class="cattleTable table is-striped is-hoverable">
    <thead>
      <tr>
        <th>Date</th>
        <th>Method</th>
        <th>Bull</th>
      </tr>
    </thead>
    <tbody>

      <tr v-for="breeding in breedings">
        <td>{{breeding.date}}</td>
        <td>{{breeding.method}}</td>
        <td>{{breeding.bull}}</td>
      </tr>

    </tbody>
  </table>
    </br>
    <h5> Health information</h5>
    <table class="cattleTable table is-striped is-hoverable">
    <thead>
      <tr>
        <th>Date</th>
        <th>Diagnosis</th>
      </tr>
    </thead>
    <tbody>

      <tr v-for="healthEvent in healthEvents">
        <td>{{healthEvent.treatmentDate}}</td>
        <td>{{healthEvent.diagnosis}}</td>
      </tr>

    </tbody>
  </table>
    </br>
    <h5> Preg-check information</h5>

    <table class="cattleTable table is-striped is-hoverable">
    <thead>
      <tr>
        <th>Date</th>
        <th>Result</th>
      </tr>
    </thead>
    <tbody>

      <tr v-for="pregnancy in pregnancies">
        <td>{{pregnancy.date}}</td>
        <td>{{pregnancy.result}}</td>
      </tr>

    </tbody>
  </table>
    <!-- <h5> Health information</h5>
    {{health.date}}
    {{health.diagnosis}}</br>
    </br>
    <h5> Preg-check information</h5>
    {{pregnancy.result}}</br>
 -->


  </div>
</template>

<script>
import axios from 'axios';
import firebase from 'firebase';

export default {
  name: 'app',
  data() {
    return {
      msg: 'Individual animal view',
      cow: [],
      breedings: [],
      healthEvents: [],
      pregnancies: []
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

    axios.get('http://127.0.0.1:3000/cattle/' + this.$route.params.id)
      .then((response) => {
        this.cow = response.data
      });
    axios.get('http://127.0.0.1:3000/breeding/' + this.$route.params.id)
      .then((response) => {
        this.breedings = response.data
      });
    axios.get('http://127.0.0.1:3000/health/' + this.$route.params.id)
      .then((response) => {
        this.healthEvents = response.data
      });
    axios.get('http://127.0.0.1:3000/pregnancy/' + this.$route.params.id)
      .then((response) => {
        this.pregnancies = response.data
      });
  }
}
</script>

<style lang="css">

.cattleTable {
  margin: 0 auto;
}
</style>
