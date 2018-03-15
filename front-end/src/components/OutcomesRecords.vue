<template lang="html">
  <div class="appContent">
    <h5 class="text-right"><router-link :to="{name: 'outcomes', params: {user}}">Back to outcomes</router-link></h5>
    <div class="card shadow">
      <div class="card-header">
        <h3 class="font-weight-bold">{{msg}}</h3>
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
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="update" role="tabpanel" aria-labelledby="update-tab">
            <form class="custom-form">
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
                <label for="editAnimalOutcomeStatus">Status*</label>
                <select v-model:value="cow.status"  class="form-control" id="editAnimalOutcomeStatus">
                  <option disabled value="">Select animal status</option>
                  <option>Active</option>
                  <option>Sold</option>
                  <option>Deceased</option>
                </select>
              </div>
              <div class="form-group">
                <label for="editAnimalOutcomeStatusChangeDate">Status Change Date*</label>
                <input v-model:value="cow.status_date" type="date" class="form-control" id="editAnimalOutcomeStatusChangeDate">
              </div>
              <div class="form-group">
                <label for="editAnimalOutcomeWeight">Weight</label>
                <input v-model:value="cow.weight" type="text" class="form-control" id="editAnimalOutcomeWeight">
              </div>
              <div class="form-group">
                <label for="editAnimalOutcomeCauseOfDeath">Cause of Death</label>
                <input v-model:value="cow.causeOfDeath" type="text" class="form-control" id="editAnimalOutcomeCauseOfDeath">
              </div>
              <div class="form-group">
                <label for="editAnimalOutcomeStatusComments">Status change comments</label>
                <input v-model:value="cow.status_comments" type="text" class="form-control" id="editAnimalOutcomeStatusComments">
              </div>
              <div class="form-group float-right">
                <button type="button" class="btn btn-secondary" @click= "cancel()">Cancel</button>
                <button type="button" class="btn btn-primary" @click="checkForm($event); editOutcome()">Update</button>
              </div>
            </form>
          </div>
          <div class="tab-pane fade text-center" id="delete" role="tabpanel" aria-labelledby="delete-tab">
            <button class="btn btn-danger" type="button" @click="deleteOutcome()" name="deleteOutcomeRecord">Delete this record</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import firebase from 'firebase';
import { authorization } from './mixins/auth';

export default {
  name: 'outcomes-records',
  data() {
    return {
      msg: 'Update this record',
      cow: [],
      user: null,
      errors: []
    }
  },
  mixins: [authorization],
  created() {
    this.user = firebase.auth().currentUser.uid;
    this.fetchData();
  },
  methods: {
    cancel() {
      this.$router.push("/" + this.user + "/outcomes");
    },
    checkForm: function(e) {
      if (this.cow.status && this.cow.status_date) return true;
      this.errors = [];
      if (!this.cow.status) this.errors.push("Cow ear tag is required.");
      if (!this.cow.status_date) this.errors.push("Calf ear tag is required.");
      e.preventDefault();
    },
    deleteOutcome() {
      axios.delete('http://127.0.0.1:3000/' + this.$route.params.user + '/cattle/' + this.$route.params.id)
        .then((response) => {
          console.log(response);
          this.$router.push("/" + this.user + "/outcomes");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editOutcome() {
      axios.patch('http://127.0.0.1:3000/' + this.$route.params.user + '/cattle/' + this.$route.params.id, {
          status: this.cow.status,
          status_date: this.cow.status_date,
          weight: this.cow.weight,
          causeOfDeath: this.cow.causeOfDeath,
          status_comments: this.cow.status_comments
        })
        .then((response) => {
          console.log(response);
          this.$router.push("/" + this.user + "/outcomes");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchData() {
      axios.get('http://127.0.0.1:3000/' + this.$route.params.user + '/cattle/' + this.$route.params.id)
        .then((response) => {
          this.cow = response.data
        });
    }
  },
  watch: {
    '$route': 'fetchData'
  }
}
</script>

<style lang="css">
</style>
