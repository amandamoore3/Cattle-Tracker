<template lang="html">
  <div class="appContent">
    <div class="card shadow">
      <div class="card-header bg-primary text-white">
        <div class="row no-gutters">
          <div class="col-8">
            <h3 class="font-weight-bold">{{msg}}</h3>
          </div>
          <div class="col-4">
            <h5 class="text-right"><a href="#" class="text-white"  data-toggle="modal" data-target="#addCalvingSeasonModal">New Calving Season</a></h5>
            <h6 class="text-right pt-2"><router-link :to="{name: 'calving', params: {user}}" class="text-white">All calving records</router-link></h6>
          </div>
        </div>
      </div>

      <template v-if="calvingSeasons.length > 0">
        <div class="table-responsive">
          <table ref="testing" class="table table table-striped table-hover">
            <thead class="thead-custom-darkgray">
              <tr>
                <th>Name</th>
                <th>Added</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr  v-for="calvingSeason in calvingSeasons">
                <td>{{calvingSeason.name}}</td>
                <td>{{calvingSeason.dateCreated}}</td>
                <td><router-link :to="{name: 'calving-season-record',params: {user, id: calvingSeason._id}}"><i class="fa fa-2x fa-chevron-circle-right"></i></router-link></td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>

      <template v-else>
        <h6 class= "p-3">There are no calving season to show. Get started by clicking "New Calving Season" above.</h6>
      </template>


    </div>
    <!-- ADD Modal -->
    <div class="modal fade" id="addCalvingSeasonModal" tabindex="-1" role="dialog" aria-labelledby="addCalvingSeasonModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header card-header">
            <h5 class="modal-title text-primary font-weight-bold" id="addCalvingSeasonModalLabel">New Calving Season</h5>
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
                  <label for="addCalvingSeasonName">Calving season name*</label>
                  <input v-model="newCalvingSeason.name" type="text" class="form-control" id="addCalvingSeasonName" placeholder="Calving Season">
                </div>
                <div class="form-group">
                  <label for="addCalvingSeasonComments">Comments</label>
                  <input v-model="newCalvingSeason.comments" type="text" class="form-control" id="addCalvingSeasonComments" placeholder="Comments">
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="clear()">Cancel</button>
              <button type="button" class="btn btn-primary" @click="checkForm($event); addCalvingSeason();" value="Add to database">Add to database</button>
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
      msg: 'Calving Seasons',
      calvingSeasons: [],
      user: null,
      // cows: [],
      errors: [],
      newCalvingSeason: {
        name: "",
        comments: ""
      }
    }
  },
  created() {
    this.user = firebase.auth().currentUser.uid;
    this.fetchData();
  },
  mixins: [hideModal, clearModal],
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    addCalvingSeason() {
      let newCalvingSeason = {
        name: this.newCalvingSeason.name,
        user: this.user,
        comments: this.newCalvingSeason.comments
      }
      axios.post('http://127.0.0.1:3000/' + this.$route.params.user + '/calving-season', newCalvingSeason)
        .then((response) => {
          console.log(response);
          this.hideModal();
          this.clearModal();
          this.newCalvingSeason.name = "";
          this.newCalvingSeason.comments = "";
          this.errors = [];
          this.fetchData();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkForm: function(e) {
      if (this.newCalvingSeason.name) return true;
      this.errors = [];
      if (!this.newCalvingSeason.name) this.errors.push("Calving season name is required.");
      e.preventDefault();
    },
    clear() {
      this.clearModal();
      this.newCalvingSeason.name = "";
      this.newCalvingSeason.comments = "";
      this.errors = [];
    },
    fetchData() {
      axios.get('http://127.0.0.1:3000/' + this.$route.params.user + '/calving-season')
        .then((response) => {
          this.calvingSeasons = response.data
        });
      // axios.get('http://127.0.0.1:3000/' + this.$route.params.user + '/cattle')
      //   .then((response) => {
      //     this.cows = response.data
      //   });
    }
  }
}
</script>

<style lang="css">


</style>
