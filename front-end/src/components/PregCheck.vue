<template lang="html">
<div class="appContent">
  <div class="card">
  <div class="card-header bg-primary text-white">
      <div class="row no-gutters">
        <div class="col-8">
          <h3 class="font-weight-bold">{{msg}}</h3>
        </div>
        <div class="col-4">
          <h5 class="text-right"><a href="#" class="text-white" data-toggle="modal" data-target="#addPregCheckModal">New Preg-check Record</a></h5>
        </div>
      </div>
    </div>

    <template v-if="pregChecks.length > 0">
      <div class="table-responsive">
        <table class="table table table-striped table-hover">
          <thead class="thead-custom-darkgray">
            <tr>
              <th>Ear Tag</th>
              <th>Date</th>
              <th>Method</th>
              <th>Result</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr  v-for="pregCheck in pregChecks" >
              <td>{{pregCheck.tag_id}}</td>
              <td>{{pregCheck.date}}</td>
              <td>{{pregCheck.method}}</td>
              <td>{{pregCheck.result}}</td>
              <td><router-link :to="{name: 'preg-check-event', params:{user, id: pregCheck._id}}"><i class="fa fa-2x fa-chevron-circle-right"></i></router-link></td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <template v-else>
      <h6 class= "p-3">There is no preg-check data to show. Get started by clicking "New Preg-Check Record" above.</h6>
    </template>
  </div>

  <!-- ADD Modal -->
  <div class="modal fade" id="addPregCheckModal" tabindex="-1" role="dialog" aria-labelledby="addPregCheckModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header card-header">
          <h5 class="modal-title text-primary font-weight-bold" id="addPregCheckModalLabel">Add New Preg-check</h5>
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
              <label for="addPregCheckTagId">Ear Tag Number*</label>
              <select v-model="newPregCheck.tag_id"  class="form-control" id="addPregCheckTagId">
                <option disabled value="">Select an active animal</option>
                <option v-for="cow in cows" v-if="cow.status =='Active' && cow.type =='Cow'">{{cow.tag_id}}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="addPregCheckDate">Date*</label>
              <input v-model="newPregCheck.date" type="date" class="form-control" id="addPregCheckDate" placeholder="mm/dd/yyyy">
            </div>
            <div class="form-group">
              <label for="addPregCheckresult">Result*</label>
              <input v-model="newPregCheck.result" type="text" class="form-control" id="addPregCheckName" placeholder="PregCheck result">
            </div>
            <div class="form-group">
              <label for="addPregCheckMethod">Method</label>
              <select v-model="newPregCheck.method" class="form-control" id="addPregCheckMethod">
                <option disabled value="">Select preg-check method</option>
                <option>Rectal palpitation</option>
                <option>Ultrasound</option>
                <option>Blood test</option>
              </select>
            </div>
            <div class="form-group">
              <label for="addPregCheckComments">Comments</label>
              <input v-model="newPregCheck.comments" type="text" class="form-control" id="addPregCheckComments" placeholder="Comments">
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
            <button type="button" class="btn btn-primary" @click="checkForm($event); addPregCheck();">Add to database</button>
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
import { authorization } from './mixins/auth';

export default {
  data() {
    return {
      msg: 'Herd Preg-checks',
      pregChecks: [],
      cows: [],
      user: null,
      errors: [],
      newPregCheck: {
        tag_id: "",
        date: "",
        method: "",
        result: "",
        comments: ""
      }
    }
  },
  mixins: [hideModal, clearModal, authorization],
  created() {
    this.user = firebase.auth().currentUser.uid;
    this.fetchData();
  },
  methods: {
    addPregCheck() {
      let newPregCheck = {
        tag_id: this.newPregCheck.tag_id,
        user: this.user,
        date: this.newPregCheck.date,
        method: this.newPregCheck.method,
        result: this.newPregCheck.result,
        comments: this.newPregCheck.comments
      }
      axios.post('http://127.0.0.1:3000/' + this.$route.params.user + '/pregnancy', newPregCheck)
        .then((response) => {
          console.log(response);
          this.hideModal();
          this.clearModal();
          this.newPregCheck.tag_id = "";
          this.newPregCheck.date = "";
          this.newPregCheck.method = "";
          this.newPregCheck.result = "";
          this.newPregCheck.comments = "";
          this.errors = [];
          this.fetchData();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkForm: function(e) {
      if (this.newPregCheck.tag_id && this.newPregCheck.date && this.newPregCheck.result) return true;
      this.errors = [];
      if (!this.newPregCheck.tag_id) this.errors.push("Ear tag is required.");
      if (!this.newPregCheck.date) this.errors.push("Preg-check date is required.");
      if (!this.newPregCheck.result) this.errors.push("Preg-check result is required.");
      e.preventDefault();
    },
    clear() {
      this.clearModal();
      this.newPregCheck.tag_id = "";
      this.newPregCheck.date = "";
      this.newPregCheck.method = "";
      this.newPregCheck.result = "";
      this.newPregCheck.comments = "";
      this.errors = [];
    },
    fetchData() {
      axios.get('http://127.0.0.1:3000/' + this.$route.params.user + '/pregnancy')
        .then((response) => {
          this.pregChecks = response.data
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
