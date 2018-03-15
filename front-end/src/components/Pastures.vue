<template lang="html">
  <div class="appContent">
    <div class="card shadow">
      <div class="card-header bg-primary text-white">
        <div class="row no-gutters">
          <div class="col-8">
            <h3 class="font-weight-bold">{{msg}}</h3>
          </div>
          <div class="col-4">
            <h5 class="text-right"><a href="#" class="text-white"  data-toggle="modal" data-target="#addPastureModal">Add Pasture</a></h5>
          </div>
        </div>
      </div>

      <template v-if="pastures.length > 0">
        <div class="table-responsive">
          <table ref="testing" class="table table table-striped table-hover">
            <thead class="thead-custom-darkgray">
              <tr>
                <th>Pasture</th>
                <!-- <th>Total #</th> -->
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr  v-for="pasture in pastures">
                <td>{{pasture.name}}</td>
                <!-- <td>{{addAnimals}}</td> -->
                <td><router-link :to="{name: 'pasture-edit',params: {user, id: pasture._id}}"><i class="fa fa-2x fa-chevron-circle-right"></i></router-link></td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>

      <template v-else>
        <h6 class= "p-3">There are no pastures to show. Get started by clicking "New Pasture" above.</h6>
      </template>


    </div>
    <!-- ADD Modal -->
    <div class="modal fade" id="addPastureModal" tabindex="-1" role="dialog" aria-labelledby="addPastureModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header card-header">
            <h5 class="modal-title text-primary font-weight-bold" id="addPastureModalLabel">Add New Pasture</h5>
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
                  <label for="addPastureName">Pasture name*</label>
                  <input v-model="newPasture.name" type="text" class="form-control" id="addPastureName" placeholder="Pasture name">
                </div>
                <div class="form-group">
                  <label for="addPastureComments">Comments</label>
                  <input v-model="newPasture.comments" type="text" class="form-control" id="addPastureComments" placeholder="Comments">
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="clear()">Cancel</button>
              <button type="button" class="btn btn-primary" @click="checkForm($event); addPasture();" value="Add to database">Add to database</button>
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
import { authorization } from './mixins/auth';

export default {
  data() {
    return {
      msg: 'Pastures',
      pastures: [],
      user: null,
      cows: [],
      errors: [],
      newPasture: {
        name: "",
        comments: ""
      }
    }
  },
  mixins: [hideModal, clearModal, authorization],
  created() {
    this.user = firebase.auth().currentUser.uid;
    this.fetchData();
  },
  computed: {
    addAnimals: function() {
      let cow = this.cows;
      let pasture = this.pastures;
      let sum = 0;
      // console.log(this.cows);
      // let sum = 0;
      // for (let i = 0; i < cow.length; i++) {
      //   sum += 1;
      // }
      // return sum;
      for (let i = 0; i < cow.length; i++) {

        if (cow[i].status == 'Active' && cow[i].pasture == pasture.name) {
          sum += 1;
        }
      }
      return sum;
    }
  },
  methods: {
    addPasture() {
      let newPasture = {
        name: this.newPasture.name,
        user: this.user,
        comments: this.newPasture.comments
      }
      axios.post('http://127.0.0.1:3000/' + this.$route.params.user + '/pastures', newPasture)
        .then((response) => {
          console.log(response);
          this.hideModal();
          this.clearModal();
          this.newPasture.name = "";
          this.newPasture.comments = "";
          this.errors = [];
          this.fetchData();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkForm: function(e) {
      if (this.newPasture.name) return true;
      this.errors = [];
      if (!this.newPasture.name) this.errors.push("Pasture name is required.");
      e.preventDefault();
    },
    clear() {
      this.clearModal();
      this.newPasture.name = "";
      this.newPasture.comments = "";
      this.errors = [];
    },
    fetchData() {
      axios.get('http://127.0.0.1:3000/' + this.$route.params.user + '/pastures')
        .then((response) => {
          this.pastures = response.data
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
