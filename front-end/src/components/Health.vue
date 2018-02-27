<template lang="html">
<div class="appContent">

  <div class="card shadow">
    <div class="card-header bg-primary text-white">
      <div class="row no-gutters">
        <div class="col-8">
          <h3 class="font-weight-bold">{{msg}}</h3>
        </div>
        <div class="col-4">
          <h5 class="text-right"><a href="#" class="text-white" data-toggle="modal" data-target="#addHealthModal">New Health Record</a></h5>
        </div>
      </div>
    </div>
    <!-- <div class="card-body"> -->
      <div class="table-responsive">
        <table class="table table table-striped table-hover">
        <thead class="thead-custom-darkgray">
          <tr>
            <th>Ear Tag</th>
            <th>Treatment Date</th>
            <th>Medication</th>
            <!-- <th>Dosage</th> -->
            <th>Diagnosis</th>
            <!-- <th>Booster Date</th> -->
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr  v-for="healthEvent in healthEvents" >
            <td>{{healthEvent.tag_id}}</td>
            <td>{{healthEvent.treatmentDate}}</td>
            <td>{{healthEvent.medication}}</td>
            <!-- <td>{{healthEvent.dosage}}</td> -->
            <td>{{healthEvent.diagnosis}}</td>
            <!-- <td>{{healthEvent.booster}}</td> -->
            <td><router-link :to="{path: '/healthevent/' + healthEvent._id}"><i class="fa fa-2x fa-chevron-circle-right"></i></router-link></td>
          </tr>
        </tbody>
      </table>
      </div>
    <!-- </div> -->
    </div>

    <!-- ADD Modal -->
    <div class="modal fade" id="addHealthModal" tabindex="-1" role="dialog" aria-labelledby="addHealthModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header card-header">
            <h5 class="modal-title text-primary font-weight-bold" id="addHealthModalLabel">Add New Health Record</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form>
            <div class="modal-body">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-4 col-sm-0">
                  </div>
                  <div class="col-md-8 col-sm-12 ">
                    <small class="float-right text-secondary mb-3">Fields marked with (*) are required.</small>
                  </div>
                </div>
              </div>
              <div class="errorContainer text-danger">
                <p v-if="errors.length">
                  <b>Please correct the following error(s):</b>
                  <ul>
                    <li v-for="error in errors">{{ error }}</li>
                  </ul>
                </p>
              </div>
              <div class="form-group">
                <label for="addHealthTagId">Ear Tag Number*</label>
                <select v-model="newHealth.tag_id"  class="form-control" id="addHealthTagId">
                  <option disabled value="">Select an active animal</option>
                  <option v-for="cow in cows" v-if="cow.status =='Active'">{{cow.tag_id}}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="addHealthDate">Treatment date*</label>
                <input v-model="newHealth.treatmentDate" type="date" class="form-control" id="addHealthDate" placeholder="mm/dd/yyyy">
              </div>
              <div class="form-group">
                <label for="addHealthDiagnosis">Diagnosis*</label>
                <input v-model="newHealth.diagnosis" type="text" class="form-control" id="addHealthDiagnosis" placeholder="Diagnosis">
              </div>
              <div class="form-group">
                <label for="addHealthMedication">Medication</label>
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
              <div class="errorContainer text-danger">
                <p v-if="errors.length">
                  <b>Please correct the following error(s):</b>
                  <ul>
                    <li v-for="error in errors">{{ error }}</li>
                  </ul>
                </p>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="clear()">Cancel</button>
              <button type="button" class="btn btn-primary" @click="checkForm($event); addHealth();">Add to database</button>
            </div>
          </form>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import firebase from 'firebase';
import { clearModal } from './mixins/clearModal';
import { hideModal } from './mixins/hideModal';

export default {
  data() {
    return {
      msg: 'Herd Health Records',
      healthEvents: [],
      cows: [],
      newHealth: [],
      errors: []
    }
  },
  beforeCreate() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {

      } else {
        this.$router.push('/login');
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
  mixins: [hideModal, clearModal],
  methods: {
    addHealth() {
      let newHealth = {
        tag_id: this.newHealth.tag_id,
        treatmentDate: this.newHealth.treatmentDate,
        medication: this.newHealth.medication,
        dosage: this.newHealth.dosage,
        booster: this.newHealth.booster,
        diagnosis: this.newHealth.diagnosis,
        comments: this.newHealth.comments
      }
      console.log(newHealth);
      axios.post('http://127.0.0.1:3000/health', newHealth)
        .then((response) => {
          console.log(response);
          this.hideModal();
          this.clearModal();
          this.newHealth.tag_id = "";
          this.newHealth.treatmentDate = "";
          this.newHealth.medication = "";
          this.newHealth.dosage = "";
          this.newHealth.booster = "";
          this.newHealth.diagnosis = "";
          this.newHealth.comments = "";
          this.errors = [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkForm: function(e) {
      if (this.newHealth.tag_id && this.newHealth.treatmentDate && this.newHealth.diagnosis) return true;
      this.errors = [];
      if (!this.newHealth.tag_id) this.errors.push("Ear tag is required.");
      if (!this.newHealth.treatmentDate) this.errors.push("Treatment date is required.");
      if (!this.newHealth.diagnosis) this.errors.push("Diagnosis is required.");
      e.preventDefault();
    },
    clear() {
      this.clearModal();
      this.newHealth.tag_id = "";
      this.newHealth.treatmentDate = "";
      this.newHealth.medication = "";
      this.newHealth.dosage = "";
      this.newHealth.booster = "";
      this.newHealth.diagnosis = "";
      this.newHealth.comments = "";
      this.errors = [];
    }
  }


}
</script>

<style lang="css">

</style>
