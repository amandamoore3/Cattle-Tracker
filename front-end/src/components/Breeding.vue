<template lang="html">
<div>
    <h1>{{msg}}</h1>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addBreedingModal">
      Add breeding event
    </button>
    <table class="table table table-striped table-hover">
      <thead>
        <tr>
          <th>Ear Tag</th>
          <th>Date</th>
          <th>Method</th>
          <th>Bull</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr  v-for="breeding in breedings" >
          <td>{{breeding.tag_id}}</td>
          <td>{{breeding.date}}</td>
          <td>{{breeding.method}}</td>
          <td>{{breeding.bull}}</td>
          <td><router-link :to="{path: '/breedingevent/' + breeding._id}"><i class="fa fa-2x fa-pencil"></i></router-link></td>
        </tr>
      </tbody>
    </table>
  <!-- ADD Modal -->
    <div class="modal fade" id="addBreedingModal" tabindex="-1" role="dialog" aria-labelledby="addBreedingModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addBreedingModalLabel">Add New Breeding Event</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="addBreedingTagId">Ear Tag #</label>
                <select v-model="newBreeding.tag_id"  class="form-control" id="addBreedingTagId">
                  <option disabled value="">Select an active animal</option>
                  <option v-for="cow in cows" v-if="cow.status =='Active'">{{cow.tag_id}}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="addBreedingDate">Breeding date</label>
                <input v-model="newBreeding.date" type="date" class="form-control" id="addBreedingDate" placeholder="mm/dd/yyyy">
              </div>
              <div class="form-group">
                <label for="addBreedingMethod">Type</label>
                <select v-model="newBreeding.method" class="form-control" id="addBreedingMethod">
                  <option disabled value="">Select breeding method</option>
                  <option>AI</option>
                  <option>Embryo</option>
                  <option>Natural</option>
                </select>
              </div>
              <div class="form-group">
                <label for="addBreedingBull">Bull</label>
                <input v-model="newBreeding.bull" type="text" class="form-control" id="addBreedingBull" placeholder="Bull">
              </div>
              <div class="form-group">
                <label for="addBreedingTechnician">Technician</label>
                <input v-model="newBreeding.technician" type="text" class="form-control" id="addBreedingTechnician" placeholder="Technician">
              </div>
              <div class="form-group">
                <label for="addBreedingComments">Comments</label>
                <input v-model="newBreeding.comments" type="text" class="form-control" id="addBreedingComments" placeholder="Comments">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="addBreeding()">Add to database</button>
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
      msg: 'All Breeding Info',
      breedings: [],
      cows: [],
      newBreeding: {
        tag_id: "",
        date: "",
        method: "",
        bull: "",
        technician: "",
        comments: ""
      }
    }
  },
  beforeCreate() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {} else {
        this.$router.push('/');
      }
    })
  },
  created() {
    axios.get('http://127.0.0.1:3000/breeding')
      .then((response) => {
        this.breedings = response.data
      });
    axios.get('http://127.0.0.1:3000/cattle')
      .then((response) => {
        this.cows = response.data
      });
  },
  methods: {
    logOut() {
      firebase.auth().signOut();
      window.location.href = '/';
    },
    addBreeding() {
      let newBreeding = {
        tag_id: this.newBreeding.tag_id,
        date: this.newBreeding.date,
        method: this.newBreeding.method,
        bull: this.newBreeding.bull,
        technician: this.newBreeding.technician,
        comments: this.newBreeding.comments
      }
      console.log(newBreeding);
      axios.post('http://127.0.0.1:3000/breeding', newBreeding)
        .then((response) => {
          console.log(response);
          window.location.href = '/breeding';
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }


}
</script>

<style lang="css">


</style>
