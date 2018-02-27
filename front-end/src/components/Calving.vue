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
          </div>
        </div>
      </div>
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
              <td>{{calving.Sire}}</td>
              <td><router-link :to="{path: '/calvingevent/' + calving._id}"><i class="fa fa-2x fa-chevron-circle-right"></i></router-link></td>
            </tr>
          </tbody>
        </table>
      </div>
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
          <form>
            <div class="modal-body">
              <div class="errorContainer text-danger">
                <p v-if="errors.length">
                  <b>Please correct the following error(s):</b>
                  <ul>
                    <li v-for="error in errors">{{ error }}</li>
                  </ul>
                </p>
              </div>
              <div class="form-group">
                <label for="addCalvingTagId">Ear Tag #</label>
                <select v-model="newCalving.tag_id"  class="form-control" id="addCalvingTagId">
                  <option disabled value="">Select an active animal</option>
                  <option v-for="cow in cows" v-if="cow.status =='Active'">{{cow.tag_id}}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="addCalvingCalfId">Calf Ear Tag</label>
                <input v-model="newCalving.calf_id" type="text" class="form-control" id="addCalvingCalfId" placeholder="Calf ear tag number">
              </div>
              <div class="form-group">
                <label for="addCalvingSeason">Season</label>
                <input v-model="newCalving.season" type="text" class="form-control" id="addCalvingSeason">
              </div>
              <div class="form-group">
                <label for="addCalvingDob">Birthdate</label>
                <input v-model="newCalving.dob" type="date" class="form-control" id="addCalvingDob" placeholder="mm/dd/yyyy">
              </div>
              <div class="form-group">
                <label for="addCalvingSex">Sex</label>
                <select v-model="newCalving.sex" class="form-control" id="addCalvingSex">
                  <option disabled value="">Select sex</option>
                  <option>Heifer</option>
                  <option>Bull</option>
                </select>
              </div>
              <div class="form-group">
                <label for="addCalvingSire">Sire</label>
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

export default {
  data() {
    return {
      msg: 'Calving Records',
      calvings: [],
      cows: [],
      errors: [],
      newCalving: {
        tag_id: "",
        dob: "",
        calf_id: "",
        season: "",
        sire: "",
        sex: "",
        comments: ""
      }
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
    axios.get('http://127.0.0.1:3000/calving')
      .then((response) => {
        this.calvings = response.data
      });
    axios.get('http://127.0.0.1:3000/cattle')
      .then((response) => {
        this.cows = response.data
      });
  },
  mixins: [hideModal, clearModal],
  methods: {
    addCalving() {
      let newCalving = {
        tag_id: this.newCalving.tag_id,
        calf_id: this.newCalving.calf_id,
        season: this.newCalving.season,
        dob: this.newCalving.dob,
        sex: this.newCalving.sex,
        sire: this.newCalving.sire,
        comments: this.newCalving.comments
      }
      console.log(newCalving);
      axios.post('http://127.0.0.1:3000/calving', newCalving)
        .then((response) => {
          console.log(response);
          this.hideModal();
          this.clearModal();
          this.newCalving.tag_id = "";
          this.newCalving.calf_id = "";
          this.newCalving.season = "";
          this.newCalving.dob = "";
          this.newCalving.sex = "";
          this.newCalving.sire = "";
          this.newCalving.comments = "";
          this.errors = [];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkForm: function(e) {
      if (this.newCalving.tag_id && this.newCalving.calf_id && this.newCalving.season && this.newCalving.sex && this.newCalving.dob && this.newCalving.sire) return true;
      this.errors = [];
      if (!this.newCalving.tag_id) this.errors.push("Cow ear tag is required.");
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
      this.newCalving.season = "";
      this.newCalving.dob = "";
      this.newCalving.sex = "";
      this.newCalving.sire = "";
      this.newCalving.comments = "";
      this.errors = [];
    }
  }
}
</script>

<style lang="css">


</style>
