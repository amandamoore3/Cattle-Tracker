<template lang="html">
<div>
    <h1>{{msg}}</h1>
    <!-- <button class="btn" @click='logOut'>Log out</button> -->
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addAnimalModal">
      Add new animal
    </button>
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Ear Tag</th>
          <th>Type</th>
          <th>Pasture</th>
          <th>Birth Date</th>
          <th>More Information</th>
        </tr>
      </thead>
      <tbody>
        <tr  v-for="cow in cows" v-if="cow.status =='Active'" >
          <td>{{cow.tag_id}}</td>
          <td>{{cow.type}}</td>
          <td>{{cow.pasture}}</td>
          <td>{{cow.dob}}</td>
          <td><router-link :to="{name: 'individual-animal', params:{id: cow.tag_id} }"><span class="icon"><i class="fa fa-2x fa-chevron-circle-right"></i></span></router-link></td>
          <!-- <td><individual-animal><span class="icon"><i class="fa fa-2x fa-chevron-circle-right"></i></span></individual-animal></td> -->

        </tr>
      </tbody>
    </table>


<!-- Modal -->
    <div class="modal fade" id="addAnimalModal" tabindex="-1" role="dialog" aria-labelledby="addAnimalModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addAnimalModalLabel">Add New Animal</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="addAnimalTagId">Ear Tag Number</label>
                <input v-model="newAnimal.tag_id" type="text" class="form-control" id="addAnimalTagId" placeholder="Ear tag number">
              </div>
              <div class="form-group">
                <label for="addAnimalType">Type</label>
                <select v-model="newAnimal.type" class="form-control" id="addAnimalType">
                  <option>Cow</option>
                  <option>Bull</option>
                  <option>Calf- bull</option>
                  <option>Calf- heifer</option>
                </select>
              </div>
              <div class="form-group">
                <label for="addAnimalDOB">Date of Birth</label>
                <input v-model="newAnimal.dob" type="date" class="form-control" id="addAnimalDOB" placeholder="mm/dd/yyyy">
              </div>
              <div class="form-group">
                <label for="addAnimalPasture">Pasture</label>
                <select v-model="newAnimal.pasture" class="form-control" id="addAnimalPasture">
                  <option disabled value="">Select a pasture</option>
                  <option v-for="pasture in pastures">{{pasture.name}}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="addAnimalSire">Sire</label>
                <input v-model="newAnimal.sire" type="text" class="form-control" id="addAnimalSire" placeholder="Sire">
              </div>
              <div class="form-group">
                <label for="addAnimalDam">Dam</label>
                <input v-model="newAnimal.dam" type="text" class="form-control" id="addAnimalDam" placeholder="Dam">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="addAnimal()">Add to database</button>
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
      msg: 'Active cattle',
      cows: [],
      pastures: [],
      newAnimal: {
        tag_id: "",
        type: "",
        dob: "",
        pasture: "",
        sire: "",
        dam: ""
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
    axios.get('http://127.0.0.1:3000/cattle')
      .then((response) => {
        this.cows = response.data
      });
    axios.get('http://127.0.0.1:3000/pastures')
      .then((response) => {
        this.pastures = response.data
      });
  },
  methods: {
    addAnimal() {
      let newCow = {
        tag_id: this.newAnimal.tag_id,
        type: this.newAnimal.type,
        dob: this.newAnimal.dob,
        pasture: this.newAnimal.pasture,
        sire: this.newAnimal.sire,
        dam: this.newAnimal.dam
      }
      console.log(newCow);
      axios.post('http://127.0.0.1:3000/cattle', newCow)
        .then((response) => {
          console.log(response);
          window.location.href = '/cattle';
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
