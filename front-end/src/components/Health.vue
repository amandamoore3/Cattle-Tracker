<template lang="html">
<div>
    <h1>{{msg}}</h1>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addHealthModal">
      Add health event
    </button>
    <table class="table table table-striped table-hover">
    <thead>
      <tr>
        <th>Ear Tag</th>
        <th>Treatment Date</th>
        <th>Medication</th>
        <th>Dosage</th>
        <th>Diagnosis</th>
        <th>Booster Date</th>
        <th>Edit</th>
      </tr>
    </thead>
    <tbody>

      <tr  v-for="healthEvent in healthEvents" >
        <td>{{healthEvent.tag_id}}</td>
        <td>{{healthEvent.treatmentDate}}</td>
        <td>{{healthEvent.medication}}</td>
        <td>{{healthEvent.dosage}}</td>
        <td>{{healthEvent.diagnosis}}</td>
        <td>{{healthEvent.booster}}</td>
        <td><router-link :to="{path: '/healthevent/' + healthEvent._id}"><i class="fa fa-2x fa-pencil"></i></router-link></td>

      </tr>

    </tbody>
  </table>

  <!-- ADD Modal -->
    <div class="modal fade" id="addHealthModal" tabindex="-1" role="dialog" aria-labelledby="addHealthModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addHealthModalLabel">Add New Health Event</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="addHealthTagId">Ear Tag #</label>
                <select v-model="newHealth.tag_id"  class="form-control" id="addHealthTagId">
                  <option disabled value="">Select an active animal</option>
                  <option v-for="cow in cows" v-if="cow.status =='Active'">{{cow.tag_id}}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="addHealthDate">Treatment date</label>
                <input v-model="newHealth.treatmentDate" type="date" class="form-control" id="addHealthDate" placeholder="mm/dd/yyyy">
              </div>
              <div class="form-group">
                <label for="addHealthDiagnosis">Diagnosis</label>
                <input v-model="newHealth.diagnosis" type="text" class="form-control" id="addHealthDiagnosis" placeholder="Diagnosis">
              </div>
              <div class="form-group">
                <label for="addHealthMedication">Type</label>
                <input v-model="newHealth.medication" class="form-control" id="addHealthMedication" placeholder="Medication">
              </div>
              <div class="form-group">
                <label for="addHealthDosage">Dosage</label>
                <input v-model="newHealth.dosage" type="text" class="form-control" id="addHealthDosage" placeholder="Dosage">
              </div>
              <div class="form-group">
                <label for="addHealthTechnician">Booster</label>
                <input v-model="newHealth.technician" type="date" class="form-control" id="addHealthTechnician" placeholder="Booster">
              </div>
              <div class="form-group">
                <label for="addHealthComments">Comments</label>
                <input v-model="newHealth.comments" type="text" class="form-control" id="addHealthComments" placeholder="Comments">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="addHealth()">Add to database</button>
          </div>
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
      msg: 'Herd Health Information',
      healthEvents: [],
      cows: [],
      newHealth: []

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
    axios.get('http://127.0.0.1:3000/cattle')
      .then((response) => {
        this.cows = response.data
      });
  },
  methods: {
    addHealth() {
      let newHealth = {
        tag_id: this.newHealth.tag_id,
        treatmentDate: this.newHealth.treatmentDate,
        medication: this.newHealth.medication,
        dosage: this.newHealth.dosage,
        booster: this.newHealth.booster,
        diagnosis: this.newHealth.diagnosis,
        comments: this.newHealth.comments,
      }
      console.log(newHealth);
      axios.post('http://127.0.0.1:3000/health', newHealth)
        .then((response) => {
          console.log(response);
          window.location.href = '/health';
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }


}
</script>

<style lang="css">

</style>
