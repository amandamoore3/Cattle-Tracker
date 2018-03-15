<template lang="html">
  <div class="appContent">
    <h5 class="text-right"><router-link :to="{name: 'pasture-movements', params:{user}}">View all movements</router-link></h5>
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
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-4 col-sm-0">
                </div>
                <div class="col-md-8 col-sm-12 ">
                  <small class="float-right text-secondary mb-3">Fields marked with (*) are required.</small>
                </div>
              </div>
            </div>
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
                <label for="editPastureMovementEarTag">Ear tag number*</label>
                <select v-model:value="pastureMovement.tag_id"  class="form-control" id="editPastureMovementTagId">
                  <option disabled value="">Select an active animal</option>
                  <option v-for="cow in cows" v-if="cow.status =='Active'">{{cow.tag_id}}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="editPastureMovementDate">Movement date*</label>
                <input v-model:value="pastureMovement.dateMoved" type="date" class="form-control" id="editPastureMovementDate" placeholder="mm/dd/yyyy">
              </div>
              <div class="form-group">
                <label for="editPastureMovementName">Pasture*</label>
                <select v-model:value="pastureMovement.name"  class="form-control" id="editPastureMovementName">
                  <option disabled>Select a pasture</option>
                  <option v-for="pasture in pastures">{{pasture.name}}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="editPastureMovementComments">Comments</label>
                <input v-model:value="pastureMovement.comments" type="text" class="form-control" id="editPastureMovementComments" placeholder="No comments found">
              </div>
              <div class="form-group float-right">
                <button type="button" class="btn btn-secondary" @click= "cancel()">Cancel</button>
                <button type="button" class="btn btn-primary" @click="checkForm($event); editMovement();">Update</button>
              </div>
              <div class="errorContainer text-danger custom-form">
                <p v-if="errors.length">
                  <b>Please correct the following error(s):</b>
                  <ul>
                    <li v-for="error in errors">{{ error }}</li>
                  </ul>
                </p>
              </div>
            </form>
          </div>
          <div class="tab-pane fade text-center" id="delete" role="tabpanel" aria-labelledby="delete-tab">
            <button class="btn btn-danger" type="button" @click="deleteMovement()" name="deleteMovement">Delete this record</button>
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
  data() {
    return {
      msg: 'Edit movement record',
      pastureMovement: [],
      pastures: [],
      cows: [],
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
      this.$router.push("/" + this.user + "/movements");
    },
    checkForm: function(e) {
      if (this.pastureMovement.name && this.pastureMovement.tag_id && this.pastureMovement.dateMoved) return true;
      this.errors = [];
      if (!this.pastureMovement.name) this.errors.push("Pasture is required.");
      if (!this.pastureMovement.tag_id) this.errors.push("Ear tag is required.");
      if (!this.pastureMovement.dateMoved) this.errors.push("Movement date is required.");
      e.preventDefault();
    },
    deleteMovement() {
      axios.delete('http://127.0.0.1:3000/' + this.$route.params.user + '/movements/' + this.$route.params.id)
        .then((response) => {
          console.log(response);
          this.$router.push("/" + this.user + "/movements");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editMovement() {
      axios.patch('http://127.0.0.1:3000/' + this.$route.params.user + '/movements/' + this.$route.params.id, {
          name: this.pastureMovement.name,
          tag_id: this.pastureMovement.tag_id,
          dateMoved: this.pastureMovement.dateMoved,
          comments: this.pastureMovement.comments
        })
        .then((response) => {
          console.log(response);
          this.$router.push("/" + this.user + "/movements");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchData() {
      axios.get('http://127.0.0.1:3000/' + this.$route.params.user + '/movements/' + this.$route.params.id)
        .then((response) => {
          this.pastureMovement = response.data
        });
      axios.get('http://127.0.0.1:3000/' + this.$route.params.user + '/cattle')
        .then((response) => {
          this.cows = response.data
        });
      axios.get('http://127.0.0.1:3000/' + this.$route.params.user + '/pastures')
        .then((response) => {
          this.pastures = response.data
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
