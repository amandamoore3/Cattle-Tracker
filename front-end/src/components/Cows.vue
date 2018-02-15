<template lang="html">
<div>
  <div class="card shadow">
    <div class="card-header bg-primary text-white">
      <div class="row no-gutters ">
        <div class="col-8">
          <h3 class="font-weight-bold">{{msg}}</h3>
        </div>
        <div class="col-4">
          <!-- Button trigger modal -->
          <h5 class="text-right"><a href="#" class="text-white" data-toggle="modal" data-target="#addAnimalModal">New animal</a></h5>
        </div>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <thead class="thead-custom-darkgray">
          <tr>
            <th>Ear Tag</th>
            <th>Type</th>
            <th>Pasture</th>
            <th>Birth Date</th>
            <!-- <th>View/ Edit</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="cow in cows" v-if="cow.status =='Active'">
                                                 <!-- <router-link :to="{name: 'itemModal', params: {id: item.id}}">See item 1</router-link> -->
            <td class="font-weight-bold text-md"><router-link :to="{name: 'individual-animal', params:{id: cow.tag_id}}">{{cow.tag_id}}</router-link></td>
            <td>{{cow.type}}</td>
            <td>{{cow.pasture}}</td>
            <td>{{cow.dob}}</td>
            <!-- <td><router-link :to="{name: 'individual-animal', params:{id: cow.tag_id} }"><span class="icon"><i class="fa fa-2x fa-chevron-circle-right"></i></span></router-link></td> -->
        </tr>
        </tbody>
      </table>
    </div>
  </div>

<!-- ADD Modal -->
    <div class="modal fade" id="addAnimalModal" tabindex="-1" role="dialog" aria-labelledby="addAnimalModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header card-header">
            <h5 class="modal-title text-primary font-weight-bold" id="addAnimalModalLabel">Add new herd animal</h5>
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
import { clearModal } from './mixins/clearModal';
import { hideModal } from './mixins/hideModal';

export default {
  data() {
    return {
      msg: 'Active Cattle',
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
      if (user) {

      } else {
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
  mixins: [hideModal, clearModal],
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
      // console.log(newCow);
      axios.post('http://127.0.0.1:3000/cattle', newCow)
        .then((response) => {
          console.log(response);
          this.hideModal();
          this.clearModal();
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }
}
</script>

<style lang="scss">


</style>
