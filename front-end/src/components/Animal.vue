<template lang="html">
  <div class="appContent">
    <div class="card shadow">
      <div class="row no-gutters card-header text-white bg-primary">
        <div class="col-12">
          <h3 class="font-weight-bold">{{cow.type}} #{{cow.tag_id}}</h3>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-striped table-hover">
          <thead class="thead-custom-darkgray">
            <tr>
              <th>Pasture</th>
              <th>Birth Date</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{currentPasture}}</td>
              <template v-if="cow.dob">
                <td>{{cow.dob}}</td>
              </template>
              <template v-else>
                <td>No DOB found</td>
              </template>
              <!-- Button trigger modal -->
              <td><span data-toggle="modal" data-target="#editAnimalModal" class="icon nav-link"><i class="fa fa-2x fa-chevron-circle-right"></i></span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <h6 class="text-right"><router-link :to="{name: 'cattle', params: {user}}" class="font-weight-bold ">Back to herd information</router-link></h6>
    <div class="card  shadow">
      <div>
        <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
          <li class="nav-item">
            <a class="nav-link font-weight-bold active" id="calving-tab" data-toggle="tab" href="#calving" role="tab" aria-controls="calving" aria-selected="true">Calving</a>
          </li>
          <li class="nav-item">
            <a class="nav-link font-weight-bold" id="breeding-tab" data-toggle="tab" href="#breeding" role="tab" aria-controls="breeding" aria-selected="false">Breeding</a>
          </li>
          <li class="nav-item">
            <a class="nav-link font-weight-bold" id="pregnancy-tab" data-toggle="tab" href="#pregnancy" role="tab" aria-controls="pregnancy" aria-selected="false">Preg</a>
          </li>
          <li class="nav-item">
            <a class="nav-link font-weight-bold" id="health-tab" data-toggle="tab" href="#health" role="tab" aria-controls="health" aria-selected="false">Health</a>
          </li>
          <li class="nav-item">
            <a class="nav-link font-weight-bold" id="movements-tab" data-toggle="tab" href="#movements" role="tab" aria-controls="movements" aria-selected="false">Movements</a>
          </li>
          <li class="nav-item">
            <a class="nav-link font-weight-bold" id="delete-tab" data-toggle="tab" href="#delete" role="tab" aria-controls="delete" aria-selected="false">Delete</a>
          </li>
        </ul>
      </div>
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="calving" role="tabpanel" aria-labelledby="calving-tab">
          <template v-if="cow.type !=='Cow' || calvings.length === 0">
            <p class="pl-3">There is no calving data for this animal.</p>
          </template>
          <template v-else>
            <div class="table-responsive">
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Season</th>
                    <th>Calf ear tag</th>
                    <th>Birthdate</th>
                    <th>Sex</th>
                    <th>Sire</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="calving in calvings">
                    <td>{{calving.season}}</td>
                    <td>{{calving.calf_id}}</td>
                    <td>{{calving.dob}}</td>
                    <td>{{calving.sex}}</td>
                    <td>{{calving.sire}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </div>
        <div class="tab-pane fade" id="breeding" role="tabpanel" aria-labelledby="breeding-tab">
          <template v-if="breedings.length === 0">
            <p class="pl-3">There is no breeding data for this animal.</p>
          </template>
          <template v-else>
            <div class="table-responsive">
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Method</th>
                    <th>Sire</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="breeding in breedings">
                    <td>{{breeding.date}}</td>
                    <td>{{breeding.method}}</td>
                    <td>{{breeding.sire}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </div>
        <div class="tab-pane fade" id="pregnancy" role="tabpanel" aria-labelledby="pregnancy-tab">
          <template v-if="cow.type !=='Cow' || pregnancies.length === 0">
            <p class="pl-3">There is no pregnancy data for this animal.</p>
          </template>
          <template v-else>
            <div class="table-responsive">
              <table class="table  table-striped table-hover">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="pregnancy in pregnancies">
                    <td>{{pregnancy.date}}</td>
                    <td>{{pregnancy.result}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </div>
        <div class="tab-pane fade" id="health" role="tabpanel" aria-labelledby="health-tab">
          <template v-if="healthEvents.length === 0">
            <p class="pl-3">There is no health data for this animal.</p>
          </template>
          <template v-else>
            <div class="table-responsive">
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Diagnosis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="healthEvent in healthEvents">
                    <td>{{healthEvent.treatmentDate}}</td>
                    <td>{{healthEvent.diagnosis}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </div>
        <div class="tab-pane fade" id="movements" role="tabpanel" aria-labelledby="movements-tab">
          <template v-if="pastureMovements.length === 0">
            <p class="pl-3">There are no pasture changes for this animal.</p>
          </template>
          <template v-else>
            <div class="table-responsive">
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Pasture</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="pastureMovement in pastureMovements">
                    <td>{{pastureMovement.dateMoved}}</td>
                    <td>{{pastureMovement.name}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </div>
        <div class="tab-pane fade text-center" id="delete" role="tabpanel" aria-labelledby="delete-tab">
          <button class="btn btn-danger" type="button" @click="deleteCow()" name="deleteCow">Delete this animal</button>
        </div>
    </div>
  </div>

  <!-- EDIT ANIMAL Modal -->
      <div class="modal fade" id="editAnimalModal" tabindex="-1" role="dialog" aria-labelledby="editAnimalModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header card-header">
              <h5 class="modal-title text-primary font-weight-bold" id="editAnimalModalLabel">Update Animal</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
              <li class="nav-item">
                <a class="nav-link font-weight-bold active" id="update-tab" data-toggle="tab" href="#update" role="tab" aria-controls="update" aria-selected="true">Information</a>
              </li>
              <li class="nav-item">
                <a class="nav-link font-weight-bold" id="statusUpdate-tab" data-toggle="tab" href="#statusUpdate" role="tab" aria-controls="statusUpdate" aria-selected="false">Status</a>
              </li>
            </ul>
            <small class="text-right pr-4 text-secondary m-1">Fields marked with (*) are required.</small>
            <div class="tab-content" id="myTabContent">
              <div class="tab-pane fade show active" id="update" role="tabpanel" aria-labelledby="update-tab">
                <div class="errorContainer custom-form text-danger">
                  <p v-if="errors.length">
                    <b>Please correct the following error(s):</b>
                    <ul>
                      <li v-for="error in errors">{{ error }}</li>
                    </ul>
                  </p>
                </div>
                <form class="custom-form">
                  <div class="form-group">
                    <label for="editAnimalTagId">Ear Tag Number*</label>
                    <input  v-model:value="cow.tag_id" type="text" class="form-control" id="editAnimalTagId" placeholder="Ear tag number">
                  </div>
                  <div class="form-group">
                    <label for="editAnimalType">Type*</label>
                    <select v-model:value="cow.type"  class="form-control" id="editAnimalType">
                      <option disabled value="">Select type of animal</option>
                      <option>Cow</option>
                      <option>Bull</option>
                      <option>Calf- bull</option>
                      <option>Calf- heifer</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="editAnimalDOB">Date of Birth</label>
                    <input v-model:value="cow.dob"  type="date" class="form-control" id="editAnimalDOB" placeholder="mm/dd/yyyy">
                  </div>
                  <div class="form-group">
                    <label for="editAnimalPasture">Pasture*</label>
                    <select v-model:value="pastureMovements.name"  class="form-control" id="editAnimalPasture">
                      <option disabled value="">To change pasture, add new pasture movement</option>
                      <option disabled v-for="pasture in pastures">{{pasture.name}}</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="editAnimalSire">Sire</label>
                    <input v-model:value="cow.sire"  type="text" class="form-control" id="editAnimalSire" placeholder="Sire">
                  </div>
                  <div class="form-group">
                    <label for="editAnimalDam">Dam</label>
                    <input v-model:value="cow.dam" type="text" class="form-control" id="editAnimalDam" placeholder="Dam">
                  </div>
                </form>
              </div>
              <div class="tab-pane fade" id="statusUpdate" role="tabpanel" aria-labelledby="statusUpdate-tab">
                <form class="custom-form">
                  <div class="form-group">
                    <label for="editAnimalStatus">Status*</label>
                    <select v-model:value="cow.status"  class="form-control" id="editAnimalStatus">
                      <option disabled value="">Select animal status</option>
                      <option>Active</option>
                      <option>Sold</option>
                      <option>Deceased</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="editAnimalStatusChangeDate">Status Change Date*</label>
                    <input v-model:value="cow.status_date" type="date" class="form-control" id="editAnimalStatusChangeDate">
                  </div>
                  <div class="form-group">
                    <label for="editAnimalWeight">Weight</label>
                    <input v-model:value="cow.weight" type="text" class="form-control" id="editAnimalWeight">
                  </div>
                  <div class="form-group">
                    <label for="editAnimalCauseOfDeath">Cause of Death</label>
                    <input v-model:value="cow.causeOfDeath" type="text" class="form-control" id="editAnimalCauseOfDeath">
                  </div>
                  <div class="form-group">
                    <label for="editAnimalStatusComments">Status change comments</label>
                    <input v-model:value="cow.status_comments" type="text" class="form-control" id="editAnimalStatusComments">
                  </div>
                </form>
              </div>
              <div class="errorContainer text-danger custom-form">
                <p v-if="errors.length">
                  <b>Please correct the following error(s):</b>
                  <ul>
                    <li v-for="error in errors">{{ error }}</li>
                  </ul>
                </p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="clear()">Cancel</button>
                <button type="submit" class="btn btn-primary" @click="checkForm($event); editAnimal();">Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- EDIT ANIMAL Modal -->
  </div>
</template>

<script>
import axios from 'axios';
import firebase from 'firebase';
import { clearModal } from './mixins/clearModal';
import { hideModal } from './mixins/hideModal';

export default {
  name: 'individual-animal',
  data() {
    return {
      msg: 'Animal Information',
      user: null,
      cow: [],
      breedings: [],
      calvings: [],
      healthEvents: [],
      pregnancies: [],
      pastures: [],
      pastureMovements: [],
      currentPasture: [],
      errors: []
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
    this.user = firebase.auth().currentUser.uid;
    this.fetchData();
  },
  mixins: [hideModal, clearModal],
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    checkForm: function(e) {
      if (this.cow.tag_id && this.cow.type && this.cow.pasture) return true;
      this.errors = [];
      if (!this.cow.tag_id) this.errors.push("Ear tag is required.");
      if (!this.cow.type) this.errors.push("Animal type is required.");
      e.preventDefault();
    },
    clear() {
      this.errors = [];
    },
    deleteCow() {
      axios.delete('http://127.0.0.1:3000/' + this.$route.params.user + '/cattle/' + this.$route.params.id)
        .then((response) => {
          console.log(response);
          this.$router.push("/" + this.user + "/cattle");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editAnimal() {
      axios.patch('http://127.0.0.1:3000/' + this.$route.params.user + '/cattle/' + this.$route.params.id, {
          tag_id: this.cow.tag_id,
          type: this.cow.type,
          dob: this.cow.dob,
          sire: this.cow.sire,
          dam: this.cow.dam,
          status: this.cow.status,
          status_date: this.cow.status_date,
          weight: this.cow.weight,
          causeOfDeath: this.cow.causeOfDeath,
          status_comments: this.cow.status_comments
        })
        .then((response) => {
          console.log(response);
          this.hideModal();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchData() {
      axios.get('http://127.0.0.1:3000/' + this.$route.params.user + '/cattle/' + this.$route.params.id)
        .then((response) => {
          this.cow = response.data
        });
      axios.get('http://127.0.0.1:3000/' + this.$route.params.user + '/breeding/' + this.$route.params.id)
        .then((response) => {
          this.breedings = response.data
        });
      axios.get('http://127.0.0.1:3000/' + this.$route.params.user + '/calving/' + this.$route.params.id)
        .then((response) => {
          this.calvings = response.data
        });
      axios.get('http://127.0.0.1:3000/' + this.$route.params.user + '/health/' + this.$route.params.id)
        .then((response) => {
          this.healthEvents = response.data
        });
      axios.get('http://127.0.0.1:3000/' + this.$route.params.user + '/pregnancy/' + this.$route.params.id)
        .then((response) => {
          this.pregnancies = response.data
        });
      axios.get('http://127.0.0.1:3000/' + this.$route.params.user + '/pastures')
        .then((response) => {
          this.pastures = response.data
        });
      axios.get('http://127.0.0.1:3000/' + this.$route.params.user + '/movement/' + this.$route.params.id)
        .then((response) => {
          this.pastureMovements = response.data
          this.currentPasture = this.pastureMovements[0].name
        });
    }
  }
}
</script>

<style lang="css">


</style>
