<template lang="html">
  <div id="app">
    <h1>{{msg}}</h1>
    <router-link :to="{path: '/breeding'}">Back to herd breeding information</router-link>

    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" id="update-tab" data-toggle="tab" href="#update" role="tab" aria-controls="update" aria-selected="true">Update</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="delete-tab" data-toggle="tab" href="#delete" role="tab" aria-controls="delete" aria-selected="false">Delete</a>
      </li>

    </ul>
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="update" role="tabpanel" aria-labelledby="update-tab">
        <form>
          <div class="form-group">
            <label for="editBreedingTagId">Ear Tag Number</label>
            <input  v-model:value="breeding.tag_id" type="text" class="form-control" id="editBreedingTagId">
          </div>
          <div class="form-group">
            <label for="editBreedingMethod">Method</label>
            <select v-model:value="breeding.method"  class="form-control" id="editBreedingMethod">
              <option disabled value="">Select breeding method</option>
              <option>AI</option>
              <option>Embryo</option>
              <option>Natural</option>
            </select>
          </div>
          <div class="form-group">
            <label for="editBreedingDOB">Date of Birth</label>
            <input v-model:value="breeding.dob"  type="date" class="form-control" id="editBreedingDOB" placeholder="mm/dd/yyyy">
          </div>
          <div class="form-group">
            <label for="editBreedingBull">Bull</label>
            <select v-model:value="breeding.bull"  class="form-control" id="editBreedingBull">
              <option disabled value="Select an active Bull">Select an active bull</option>
              <option v-for="cow in cows" v-if="cow.type == 'Bull'">{{cow.tag_id}}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="editBreedingTech">Technician</label>
            <input v-model:value="breeding.technician"  type="text" class="form-control" id="editBreedingTech" placeholder="No technician found">
          </div>
          <div class="form-group">
            <label for="editBreedingComments">Comments</label>
            <input v-model:value="breeding.comments" type="text" class="form-control" id="editBreedingComments" placeholder="No comments found">
          </div>
          <div class="form-group">
            <button type="button" class="btn btn-secondary" @click= "cancel()">Cancel</button>
            <button type="button" class="btn btn-primary" @click="editBreeding()">Update</button>
          </div>

        </form>
      </div>
      <div class="tab-pane fade" id="delete" role="tabpanel" aria-labelledby="delete-tab">
        <div class="form-group">
          <h5> Delete</h5>
          <button class="btn btn-danger" type="button" @click="deleteBreeding()" name="deleteBreedingEvent">Delete this breeding event</button>
        </div>
      </div>
    </div>
  </div>
        <!-- EDIT/DELETE FORM -->
        <!-- <div class="modal fade" id="editBreedingModal" tabindex="-1" role="dialog" aria-labelledby="editBreedingModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="editBreedingModalLabel">Edit Breeding</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group">
                    <label for="editBreedingTagId">Ear Tag Number</label> -->
                    <!-- <input  v-model:value="thisBreeding.tag_id" type="text" class="form-control" id="editBreedingTagId"> -->
                  <!-- </div>
                  <div class="form-group">
                    <label for="editBreedingMethod">Method</label> -->
                    <!-- <select v-model:value="breeding.method"  class="form-control" id="editBreedingMethod">
                      <option disabled value="">Select breeding method</option>
                      <option>AI</option>
                      <option>Embryo</option>
                      <option>Natural</option>
                    </select> -->
                  <!-- </div>
                  <div class="form-group">
                    <label for="editBreedingDOB">Date of Birth</label> -->
                    <!-- <input v-model:value="breeding.dob"  type="date" class="form-control" id="editBreedingDOB" placeholder="mm/dd/yyyy"> -->
                  <!-- </div>
                  <div class="form-group">
                    <label for="editBreedingPasture">Pasture</label> -->
                    <!-- <select v-model:value="breeding.pasture"  class="form-control" id="editBreedingPasture">
                      <option disabled value="">Select a pasture</option>
                      <option v-for="pasture in pastures">{{pasture.name}}</option>
                    </select> -->
                  <!-- </div>
                  <div class="form-group">
                    <label for="editBreedingSire">Sire</label> -->
                    <!-- <input v-model:value="breeding.sire"  type="text" class="form-control" id="editBreedingSire" placeholder="Sire"> -->
                  <!-- </div>
                  <div class="form-group">
                    <label for="editBreedingDam">Dam</label> -->
                    <!-- <input v-model:value="breeding.dam" type="text" class="form-control" id="editBreedingDam" placeholder="Dam"> -->
                  <!-- </div>
                </form>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="editBreeding()">Add to database</button>
              </div>
            </div>
          </div>
        </div> -->

</template>

<script>
import axios from 'axios';
import firebase from 'firebase';

export default {
  data() {
    return {
      msg: 'Edit this breeding record',
      breeding: [],
      cows: []
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
    axios.get('http://127.0.0.1:3000/breedingevent/' + this.$route.params.id)
      .then((response) => {
        this.breeding = response.data
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
    cancel() {
      window.location.href = '/breeding';
    },
    deleteBreeding() {
      // console.log(this.$route.params.id);
      axios.delete('http://127.0.0.1:3000/breedingevent/' + this.$route.params.id)
        .then((response) => {
          console.log(response);
          window.location.href = '/breeding';
        })
        .catch((err) => {
          console.log(err.response);
        });

    },
    editBreeding() {
      console.log('testing edit breeding method');
      axios.patch('http://127.0.0.1:3000/breedingevent/' + this.$route.params.id, {
          tag_id: this.breeding.tag_id,
          date: this.breeding.date,
          method: this.breeding.method,
          bull: this.breeding.bull,
          technician: this.breeding.technician,
          comments: this.breeding.comments,

        })
        .then(function(response) {
          console.log(response);
          window.location.href = '/breeding';
        })
        .catch(function(error) {
          console.log(error.response);
        });
    }
  }

}
</script>

<style lang="css">
</style>
