<template lang="html">
  <div class="appContent">
    <h5 class="text-right"><router-link :to="{name: 'preg-check', params:{user}}">All Preg-Check Records</router-link></h5>
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
                <label for="editPregCheckTagId">Ear Tag Number*</label>
                <select v-model:value="pregCheck.tag_id"  class="form-control" id="editPregCheckTagId">
                  <option disabled value="">Select an active animal</option>
                  <option v-for="cow in cows" v-if="cow.status =='Active' && cow.type =='Cow'">{{cow.tag_id}}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="editPregCheckDate">Date*</label>
                <input v-model:value="pregCheck.date"  type="date" class="form-control" id="editPregCheckDate" placeholder="mm/dd/yyyy">
              </div>
              <div class="form-group">
                <label for="editPregCheckResult">Result*</label>
                <input v-model:value="pregCheck.result"  type="text" class="form-control" id="editPregCheckResult" >
              </div>
              <div class="form-group">
                <label for="editPregCheckMethod">Method</label>
                <select v-model:value="pregCheck.method"  class="form-control" id="editPregCheckMethod" placeholder="No method found">
                  <option disabled value="">Select preg-check method</option>
                  <option>Rectal palpitation</option>
                  <option>Ultrasound</option>
                  <option>Blood test</option>
                </select>
              </div>
              <div class="form-group">
                <label for="editPregCheckComments">Comments</label>
                <input v-model:value="pregCheck.comments" type="text" class="form-control" id="editPregCheckComments" placeholder="No comments found">
              </div>
              <div class="errorContainer text-danger custom-form">
                <p v-if="errors.length">
                  <b>Please correct the following error(s):</b>
                  <ul>
                    <li v-for="error in errors">{{ error }}</li>
                  </ul>
                </p>
              </div>
              <div class="form-group float-right">
                <button type="button" class="btn btn-secondary" @click= "cancel()">Cancel</button>
                <button type="button" class="btn btn-primary" @click="checkForm($event); editPregCheck();">Update</button>
              </div>
            </form>
          </div>
          <div class="tab-pane fade text-center" id="delete" role="tabpanel" aria-labelledby="delete-tab">
            <button class="btn btn-danger" type="button" @click="deletePregCheck()" name="deletePregCheckEvent">Delete this record</button>
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
      msg: 'Edit preg-check record',
      pregCheck: [],
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
      this.$router.push("/" + this.user + "/pregnancy");
    },
    checkForm: function(e) {
      if (this.pregCheck.tag_id && this.pregCheck.date && this.pregCheck.result) return true;
      this.errors = [];
      if (!this.pregCheck.tag_id) this.errors.push("Ear tag is required.");
      if (!this.pregCheck.date) this.errors.push("Preg-check date is required.");
      if (!this.pregCheck.result) this.errors.push("Preg-check result is required.");
      e.preventDefault();
    },
    deletePregCheck() {
      axios.delete('http://127.0.0.1:3000/' + this.$route.params.user + '/pregnancy/' + this.$route.params.id)
        .then((response) => {
          console.log(response);
          this.$router.push("/" + this.user + "/pregnancy");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editPregCheck() {
      axios.patch('http://127.0.0.1:3000/' + this.$route.params.user + '/pregnancy/' + this.$route.params.id, {
          tag_id: this.pregCheck.tag_id,
          date: this.pregCheck.date,
          method: this.pregCheck.method,
          result: this.pregCheck.result,
          comments: this.pregCheck.comments
        })
        .then((response) => {
          console.log(response);
          this.$router.push("/" + this.user + "/pregnancy");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchData() {
      axios.get('http://127.0.0.1:3000/' + this.$route.params.user + '/pregcheck/' + this.$route.params.id)
        .then((response) => {
          this.pregCheck = response.data
        });
      axios.get('http://127.0.0.1:3000/' + this.$route.params.user + '/cattle')
        .then((response) => {
          this.cows = response.data
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
