<template lang="html">
  <div id="app">
    <h1>{{msg}}</h1>
    <router-link :to="{path: '/cattle'}">Back to herd information</router-link>


    <table class="cattleTable table table table-striped table-hover">
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
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Breeding</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Health</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Pregnancy</a>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
        <h5> Breeding information</h5>
        <table class="cattleTable table table table-striped table-hover">
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


      </div>
      <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
        <h5> Health information</h5>
        <table class="cattleTable table table table-striped table-hover">
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
      </div>
      <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
        <h5> Preg-check information</h5>
        <template v-if="cow.type !=='Cow'">
          <p>There is no pregnancy data to show</p>
        </template>

        <template v-else>
          <table class="cattleTable table table table-striped table-hover">
          <thead>
            <tr>
              <th>Date</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pregnancy in pregnancies"  >
              <td>{{pregnancy.date}}</td>
              <td>{{pregnancy.result}}</td>
            </tr>
          </tbody>
        </table>
        </template>

      </div>
    </div>

 <h5>Delete</h5>
 <button class="btn btn-danger" type="button" @click="deleteCow()" name="deleteCow">Delete this animal</button>

  </div>
</template>

<script>
import axios from 'axios';
import firebase from 'firebase';

export default {
  name: 'app',
  data() {
    return {
      msg: 'Animal Information',
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
  },
  methods: {
    deleteCow() {
      // console.log(this.$route.params.id);
      axios.delete('http://127.0.0.1:3000/cattle/' + this.$route.params.id)
        .then((response) => {
          console.log(response);
          window.location.href = '/cattle';
        })
        .catch((err) => {
          console.log(err);
        });

    }
  }
}
</script>

<style lang="css">

.cattleTable {
  margin: 0 auto;
}
</style>
