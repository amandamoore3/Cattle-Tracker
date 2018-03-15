<template lang="html">
<div>
  <div class="appContent">
    <div class="card shadow">
      <div class="card-header text-white bg-primary">
        <div class="row no-gutters">
          <div class="col-8">
            <h3 class="font-weight-bold">{{msg}}</h3>
          </div>
          <div class="col-4">
            <h5 class="text-right"><a href="#" class="text-white" data-toggle="modal" data-target="#addCalvingModal">New Calving Record</a></h5>
            <h6 class="text-right"><router-link :to="{name: 'calving-season', params: {user}}" class="text-white">Manage calving seasons</router-link></h6>

          </div>
        </div>
      </div>

      <template v-if="calvings.length > 0">
        <div class="table-responsive">
          <table class="table table table-striped table-hover">
            <thead class="thead-custom-darkgray">
              <tr>
                <th>Ear Tag</th>
                <th>Calf Ear Tag</th>
                <th>Season</th>
                <th>Sex</th>
                <th>Sire</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr  v-for="calving in calvings" >
                <td>{{calving.tag_id}}</td>
                <td>{{calving.calf_id}}</td>
                <td>{{calving.season}}</td>
                <td>{{calving.sex}}</td>
                <td>{{calving.sire}}</td>
                <td><router-link :to="{name: 'calving-record', params: {user, id:calving._id }}"><i class="fa fa-2x fa-chevron-circle-right"></i></router-link></td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
      <template v-else>
        <h6 class= "p-3">There is no calving data to show. Get started by clicking "New Calving Record" above.</h6>
      </template>
    </div>

  <!-- ADD Modal -->
    <div class="modal fade" id="addCalvingModal" tabindex="-1" role="dialog" aria-labelledby="addCalvingModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header card-header">
            <h5 class="modal-title text-primary" id="addCalvingModalLabel">Add New Calving Record</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <small class="text-secondary p-3">Note: this form adds a new calving record, adds calf to active animals, and registers first pasture location.</small>

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
                <label for="addCalvingTagId">Ear Tag Number*</label>
                <select v-model="newCalving.tag_id"  class="form-control" id="addCalvingTagId">
                  <option disabled value="">Select an active animal</option>
                  <option v-for="cow in cows" v-if="cow.status =='Active' && cow.type =='Cow'">{{cow.tag_id}}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="addCalvingCalfId">Calf Ear Tag*</label>
                <input v-model="newCalving.calf_id" type="text" class="form-control" id="addCalvingCalfId" placeholder="Calf ear tag number">
              </div>
              <div class="form-group">
                <label for="addCalvingSeason">Season*</label>
                <select v-model="newCalving.season" type="text" class="form-control" id="addCalvingSeason">
                  <option disabled value="">If season is not listed, add new calving season.</option>
                  <option v-for="calvingSeason in calvingSeasons">{{calvingSeason.name}}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="addCalvingDob">Birth Date*</label>
                <input v-model="newCalving.dob" type="date" class="form-control" id="addCalvingDob" placeholder="mm/dd/yyyy">
              </div>
              <div class="form-group">
                <label for="addCalvingSex">Sex*</label>
                <select v-model="newCalving.sex" class="form-control" id="addCalvingSex">
                  <option disabled value="">Select sex</option>
                  <option>Calf- heifer</option>
                  <option>Calf- bull</option>
                </select>
              </div>
              <div class="form-group">
                <label for="addInitialPastureMovementName">Pasture*</label>
                <select v-model="newCalving.pasture"  class="form-control" id="addInitialPastureMovementName">
                  <option disabled value="">Select a pasture</option>
                  <option v-for="pasture in pastures">{{pasture.name}}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="addCalvingSire">Sire*</label>
                <input v-model="newCalving.sire" type="text" class="form-control" id="addCalvingSire" placeholder="Sire">
              </div>
              <div class="form-group">
                <label for="addCalvingComments">Comments</label>
                <input v-model="newCalving.comments" type="text" class="form-control" id="addCalvingComments" placeholder="Comments">
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
              <button type="button" class="btn btn-primary" @click="checkForm($event); addCalving();">Add to database</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- ADD Modal -->
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
      msg: 'Calving Records',
      calvings: [],
      cows: [],
      pastures: [],
      calvingSeasons: [],
      user: null,
      errors: [],
      newCalving: {
        tag_id: "",
        dob: "",
        status: "Active",
        pasture: "",
        calf_id: "",
        season: "",
        sire: "",
        sex: "",
        comments: ""
      }
    }
  },
  mixins: [hideModal, clearModal, authorization],

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
    this.fetchData();
  },

  methods: {
    addCalving() {
      let newCalving = {
        tag_id: this.newCalving.tag_id,
        user: this.user,
        calf_id: this.newCalving.calf_id,
        season: this.newCalving.season,
        dob: this.newCalving.dob,
        sex: this.newCalving.sex,
        sire: this.newCalving.sire,
        comments: this.newCalving.comments
      }
      let newCow = {
        user: this.user,
        tag_id: this.newCalving.calf_id,
        type: this.newCalving.sex,
        dob: this.newCalving.dob,
        status: this.newCalving.status,
        sire: this.newCalving.sire,
        dam: this.newCalving.tag_id
      }
      let firstPastureMovement = {
        user: this.user,
        tag_id: this.newCalving.calf_id,
        name: this.newCalving.pasture,
        dateMoved: this.newCalving.dob
      }
      axios.post('http://127.0.0.1:3000/' + this.$route.params.user + '/cattle', newCow)
        .then((response) => {
          // console.log(newCow);
          // console.log(newCalving);
          // console.log(firstPastureMovement);
          axios.post('http://127.0.0.1:3000/' + this.$route.params.user + '/movements', firstPastureMovement)
            .then((response) => {
              axios.post('http://127.0.0.1:3000/' + this.$route.params.user + '/calving', newCalving)
                .then((response) => {
                  console.log(response);
                  this.fetchData();
                })
            })
          this.hideModal();
          this.clearModal();
          this.newCalving.tag_id = "";
          this.newCalving.calf_id = "";
          this.newCalving.season = "";
          this.newCalving.pasture = "";
          this.newCalving.dob = "";
          this.newCalving.sex = "";
          this.newCalving.sire = "";
          this.newCalving.comments = "";
          this.errors = [];
        })
        .catch((err) => {
          console.log(err);
          this.errors.unshift("There was an error with your request.  Check that you are not using a duplicate ear tag number.");
        });
    },
    checkForm: function(e) {
      if (this.newCalving.tag_id && this.newCalving.pasture && this.newCalving.calf_id && this.newCalving.season && this.newCalving.sex && this.newCalving.dob && this.newCalving.sire) return true;
      this.errors = [];
      if (!this.newCalving.tag_id) this.errors.push("Cow ear tag is required.");
      if (!this.newCalving.pasture) this.errors.push("Pasture is required.");
      if (!this.newCalving.calf_id) this.errors.push("Calf ear tag is required.");
      if (!this.newCalving.season) this.errors.push("Calving Season is required.");
      if (!this.newCalving.dob) this.errors.push("Calf birth date is required.");
      if (!this.newCalving.sex) this.errors.push("Calf sex is required.");
      if (!this.newCalving.sire) this.errors.push("Sire is required.");
      e.preventDefault();
    },
    clear() {
      this.clearModal();
      this.newCalving.tag_id = "";
      this.newCalving.calf_id = "";
      this.newCalving.pasture = "";
      this.newCalving.season = "";
      this.newCalving.dob = "";
      this.newCalving.sex = "";
      this.newCalving.sire = "";
      this.newCalving.comments = "";
      this.errors = [];
    },
    fetchData() {
      axios.get('http://127.0.0.1:3000/' + this.$route.params.user + '/calving')
        .then((response) => {
          this.calvings = response.data
        });
      axios.get('http://127.0.0.1:3000/' + this.$route.params.user + '/cattle')
        .then((response) => {
          this.cows = response.data
        });
      axios.get('http://127.0.0.1:3000/' + this.$route.params.user + '/pastures')
        .then((response) => {
          this.pastures = response.data
        });
      axios.get('http://127.0.0.1:3000/' + this.$route.params.user + '/calving-season')
        .then((response) => {
          this.calvingSeasons = response.data
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
