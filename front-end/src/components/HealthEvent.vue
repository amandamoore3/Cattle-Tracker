<template lang="html">
  <div class="appContent">
    <h5 class="text-right"><router-link :to="{path: '/health'}">Herd health records</router-link></h5>

    <div class="card shadow">
      <div class="card-header">
        <div class="row no-gutters">
          <h3 class="font-weight-bold">{{msg}}</h3>
        </div>
      </div>
      <div>
        <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" id="update-tab" data-toggle="tab" href="#update" role="tab" aria-controls="update" aria-selected="true">Update</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="delete-tab" data-toggle="tab" href="#delete" role="tab" aria-controls="delete" aria-selected="false">Delete</a>
          </li>
        </ul>
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-4 col-sm-0">
            </div>
            <div class="col-md-8 col-sm-12 ">
              <small class="float-right text-secondary mb-3">Fields marked with (*) are required.</small>
            </div>
          </div>
        </div>
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="update" role="tabpanel" aria-labelledby="update-tab">
            <div class="errorContainer text-danger custom-form">
              <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                  <li v-for="error in errors">{{ error }}</li>
                </ul>
              </p>
            </div>
            <form class="custom-form">
              <div class="form-group">
                <label for="editHealthTagId">Ear Tag Number*</label>
                <select v-model:value="health.tag_id"  class="form-control" id="editHealthTagId">
                  <option disabled>Select an active animal</option>
                  <option v-for="cow in cows" v-if="cow.status =='Active'">{{cow.tag_id}}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="editHealthTreatmentDate">Treatment Date*</label>
                <input v-model:value="health.treatmentDate"  type="date" class="form-control" id="editHealthTreatmentDate" placeholder="mm/dd/yyyy">
              </div>
              <div class="form-group">
                <label for="editHealthDiagnosis">Diagnosis*</label>
                <input v-model:value="health.diagnosis"  type="text" class="form-control" id="editHealthDiagnosis" placeholder="No Diagnosis found">
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
                <label for="editHealthComments">Comments</label>
                <input v-model:value="health.comments" type="text" class="form-control" id="editHealthComments" placeholder="No comments found">
              </div>
              <div class="errorContainer text-danger">
                <p v-if="errors.length">
                  <b>Please correct the following error(s):</b>
                  <ul>
                    <li v-for="error in errors">{{ error }}</li>
                  </ul>
                </p>
              </div>
              <div class="form-group float-right">
                <button type="button" class="btn btn-secondary " @click="cancel()">Cancel</button>
                <button type="button" class="btn btn-primary" @click="checkForm($event); editHealth();">Update</button>
              </div>
            </form>
          </div>
          <div class="tab-pane fade text-center" id="delete" role="tabpanel" aria-labelledby="delete-tab">
              <button class="btn btn-danger" type="button" @click="deleteHealth()" name="deleteHealthEvent">Delete this record</button>
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
      msg: 'Edit health record',
      health: [],
      cows: [],
      user: null,
      errors: []
    }
  },
  // beforeCreate() {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //
  //     } else {
  //       this.$router.push('/login');
  //     }
  //   })
  // },
  created() {
    this.user = firebase.auth().currentUser.uid;
    axios.get('http://127.0.0.1:3000/' + this.$route.params.user + '/healthevent/' + this.$route.params.id)
      .then((response) => {
        this.health = response.data
      });
    axios.get('http://127.0.0.1:3000/' + this.$route.params.user + '/cattle')
      .then((response) => {
        this.cows = response.data
      });
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    cancel() {
      this.$router.push("/" + this.user + "/health");
    },
    checkForm: function(e) {
      if (this.health.tag_id && this.health.treatmentDate && this.health.diagnosis) return true;
      this.errors = [];
      if (!this.health.tag_id) this.errors.push("Ear tag is required.");
      if (!this.health.treatmentDate) this.errors.push("Treatment date is required.");
      if (!this.health.diagnosis) this.errors.push("Diagnosis is required.");
      e.preventDefault();
    },
    deleteHealth() {
      axios.delete('http://127.0.0.1:3000/' + this.$route.params.user + '/healthevent/' + this.$route.params.id)
        .then((response) => {
          console.log(response);
          this.$router.push("/" + this.user + "/health");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editHealth() {
      axios.patch('http://127.0.0.1:3000/' + this.$route.params.user + '/healthevent/' + this.$route.params.id, {
          tag_id: this.health.tag_id,
          treatmentDate: this.health.treatmentDate,
          medication: this.health.medication,
          dosage: this.health.dosage,
          booster: this.health.booster,
          diagnosis: this.health.diagnosis,
          comments: this.health.comments
        })
        .then((response) => {
          console.log(response);
          this.$router.push("/" + this.user + "/health");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
</script>

<style lang="css">
</style>
