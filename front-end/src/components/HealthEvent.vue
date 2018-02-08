<template lang="html">
  <div>
    <h1>{{msg}}</h1>
    <router-link :to="{path: '/health'}">Back to herd health information</router-link>

    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" id="update-tab" data-toggle="tab" href="#update" role="tab" aria-controls="update" aria-selected="true">Update</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="delete-tab" data-toggle="tab" href="#delete" role="tab" aria-controls="delete" aria-selected="false">Delete</a>
      </li>

    </ul>
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="update" role="tabpanel" aria-labelledby="update-tab">
        <form>
          <div class="form-group">
            <label for="editHealthTagId">Ear Tag Number</label>
            <select v-model="health.tag_id"  class="form-control" id="editHealthTagId">
              <option disabled value="">Select an active animal</option>
              <option v-for="cow in cows" v-if="cow.status =='Active'">{{cow.tag_id}}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="editHealthTreatmentDate">Treatment Date</label>
            <input v-model:value="health.treatmentDate"  type="date" class="form-control" id="editHealthTreatmentDate" placeholder="mm/dd/yyyy">
          </div>
          <div class="form-group">
            <label for="editHealthMedication">Medication</label>
            <input  v-model:value="health.medication" type="text" class="form-control" id="editHealthMedication" placeholder="No Medication found">
          </div>
          <div class="form-group">
            <label for="editHealthDosage">Dosage</label>
            <input  v-model:value="health.dosage" type="text" class="form-control" id="editHealthDosage" placeholder="No Dosage found">
          </div>
          <div class="form-group">
            <label for="editHealthBooster">Booster</label>
            <input  v-model:value="health.booster" type="date" class="form-control" id="editHealthBooster">
          </div>
          <div class="form-group">
            <label for="editHealthDiagnosis">Diagnosis</label>
            <input v-model:value="health.diagnosis"  type="text" class="form-control" id="editHealthDiagnosis" placeholder="No Diagnosis found">
          </div>
          <div class="form-group">
            <label for="editHealthComments">Comments</label>
            <input v-model:value="health.comments" type="text" class="form-control" id="editHealthComments" placeholder="No comments found">
          </div>
          <div class="form-group">
            <button type="button" class="btn btn-secondary" @click= "cancel()">Cancel</button>
            <button type="button" class="btn btn-primary" @click="editHealth()">Update</button>
          </div>

        </form>
      </div>
      <div class="tab-pane fade" id="delete" role="tabpanel" aria-labelledby="delete-tab">
        <div class="form-group">
          <h5> Delete</h5>
          <button class="btn btn-danger" type="button" @click="deleteHealth()" name="deleteHealthEvent">Delete this health event</button>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import axios from 'axios';
import firebase from 'firebase';

export default {
  data() {
    return {
      msg: 'Edit this health record',
      health: [],
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
    axios.get('http://127.0.0.1:3000/healthevent/' + this.$route.params.id)
      .then((response) => {
        this.health = response.data
      });
    axios.get('http://127.0.0.1:3000/cattle')
      .then((response) => {
        this.cows = response.data
      });
  },
  methods: {
    logOut() {
      firebase.auth().signOut();
      window.location.href = '/';
    },
    cancel() {
      window.location.href = '/health';
    },
    deleteHealth() {
      // console.log(this.$route.params.id);
      axios.delete('http://127.0.0.1:3000/healthevent/' + this.$route.params.id)
        .then((response) => {
          console.log(response);
          window.location.href = '/health';
        })
        .catch((err) => {
          console.log(err.response);
        });

    },
    editHealth() {
      console.log('testing edit health method');
      axios.patch('http://127.0.0.1:3000/healthevent/' + this.$route.params.id, {
          tag_id: this.health.tag_id,
          treatmentDate: this.health.treatmentDate,
          medication: this.health.medication,
          dosage: this.health.dosage,
          booster: this.health.booster,
          diagnosis: this.health.diagnosis,
          comments: this.health.comments,

        })
        .then(function(response) {
          console.log(response);
          window.location.href = '/health';
        })
        .catch(function(error) {
          console.log(error.response);
        });
    }
  }

}
</script>

<style lang="css">
</style>
