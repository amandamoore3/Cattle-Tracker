<template lang="html">
  <div class="appContent">
    <div class="card shadow">
      <div class="card-header bg-primary text-white">
        <div class="row no-gutters">
          <div class="col-8">
            <h3 class="font-weight-bold">{{msg}}</h3>
          </div>
          <div class="col-4">
            <h5 class="text-right"><a href="#" class="text-white"  data-toggle="modal" data-target="#addPastureMovementModal">Add Movement</a></h5>
          </div>
        </div>
      </div>
      <div class="table-responsive">
        <table ref="testing" class="table table table-striped table-hover">
          <thead class="thead-custom-darkgray">
            <tr>
              <th>Ear tag</th>
              <th>Pasture</th>
              <th>Date moved</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr  v-for="pastureMovement in pastureMovements">
              <td>{{pastureMovement.tag_id}}</td>
              <td>{{pastureMovement.name}}</td>
              <td>{{pastureMovement.dateMoved}}</td>
              <td><router-link :to="{path: '/movements/' + pastureMovement._id}"><i class="fa fa-2x fa-chevron-circle-right"></i></router-link></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- ADD Modal -->
    <div class="modal fade" id="addPastureMovementModal" tabindex="-1" role="dialog" aria-labelledby="addPastureMovementModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header card-header">
            <h5 class="modal-title text-primary font-weight-bold" id="addPastureModalLabel">Add New Pasture Movement</h5>
            <button type="button" @click="clear()" class="close" data-dismiss="modal" aria-label="Close">
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
                  <label for="addPastureMovementEarTag">Ear tag number*</label>
                  <select v-model="newPastureMovement.tag_id"  class="form-control" id="addPastureMovementTagId">
                    <option disabled value="">Select an active animal</option>
                    <option v-for="cow in cows" v-if="cow.status =='Active'">{{cow.tag_id}}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="addPastureMovementDate">Movement date*</label>
                  <input v-model="newPastureMovement.dateMoved" type="date" class="form-control" id="addPastureMovementDate" placeholder="mm/dd/yyyy">
                </div>
                <div class="form-group">
                  <label for="addPastureMovementName">Pasture name*</label>
                  <select v-model="newPastureMovement.name"  class="form-control" id="addPastureMovementName">
                    <option disabled value="">Select a pasture</option>
                    <option v-for="pasture in pastures">{{pasture.name}}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="addPastureMovementComments">Comments</label>
                  <input v-model="newPastureMovement.comments" type="text" class="form-control" id="addPastureMovementComments" placeholder="Comments">
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="clear()">Cancel</button>
              <button type="button" class="btn btn-primary" @click="checkForm($event); addPastureMovement();" value="Add to database">Add to database</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- ADD Modal -->
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
      msg: 'Pasture Movements',
      pastureMovements: [],
      pastures: [],
      cows: [],
      errors: [],
      newPastureMovement: {
        name: "",
        tag_id: "",
        dateMoved: "",
        comments: ""
      }
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
    this.fetchData();
  },
  mixins: [hideModal, clearModal],
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    addPastureMovement() {
      let newPastureMovement = {
        name: this.newPastureMovement.name,
        tag_id: this.newPastureMovement.tag_id,
        dateMoved: this.newPastureMovement.dateMoved,
        comments: this.newPastureMovement.comments
      }
      axios.post('http://127.0.0.1:3000/movements', newPastureMovement)
        .then((response) => {
          console.log(response);
          this.pastureMovements.unshift(newPastureMovement); //this is needed to force vue to update the DOM
          this.hideModal();
          this.clearModal();
          this.newPastureMovement.name = "";
          this.newPastureMovement.dateMoved = "";
          this.newPastureMovement.tag_id = "";
          this.newPastureMovement.comments = "";
          this.errors = [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkForm: function(e) {
      if (this.newPastureMovement.name && this.newPastureMovement.dateMoved && this.newPastureMovement.tag_id) return true;
      this.errors = [];
      if (!this.newPastureMovement.name) this.errors.push("Pasture name is required.");
      if (!this.newPastureMovement.tag_id) this.errors.push("Ear tag number is required.");
      if (!this.newPastureMovement.dateMoved) this.errors.push("Movement date is required.");
      e.preventDefault();
    },
    clear() {
      this.clearModal();
      this.newPastureMovement.name = "";
      this.newPastureMovement.dateMoved = "";
      this.newPastureMovement.tag_id = "";
      this.newPastureMovement.comments = "";
      this.errors = [];
    },
    fetchData() {
      axios.get('http://127.0.0.1:3000/' + this.$route.params.user + '/movements')
        .then((response) => {
          this.pastureMovements = response.data
        });
      axios.get('http://127.0.0.1:3000/' + this.$route.params.user + '/pastures')
        .then((response) => {
          this.pastures = response.data
        });
      axios.get('http://127.0.0.1:3000/' + this.$route.params.user + '/cattle')
        .then((response) => {
          this.cows = response.data
        });
    }
  }
}
</script>

<style lang="css">


</style>
