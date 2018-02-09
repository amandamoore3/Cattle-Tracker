<template lang="html">
  <div>
    <h1>{{msg}}</h1>
    <router-link :to="{path: '/cattle'}">Back to herd information</router-link>
    <table class="table table table-striped table-hover">
      <thead>
        <tr>
          <th>Ear Tag</th>
          <th>Type</th>
          <th>Pasture</th>
          <th>Birth Date</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr >
          <td>{{cow.tag_id}}</td>
          <td>{{cow.type}}</td>
          <td>{{cow.pasture}}</td>
          <td>{{cow.dob}}</td>
          <!-- Button trigger modal -->
          <td><span data-toggle="modal" data-target="#editAnimalModal" class="icon"><i class="fa fa-2x fa-pencil"></i></span></td>
        </tr>
      </tbody>
    </table>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" id="breeding-tab" data-toggle="tab" href="#breeding" role="tab" aria-controls="breeding" aria-selected="true">Breeding</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="health-tab" data-toggle="tab" href="#health" role="tab" aria-controls="health" aria-selected="false">Health</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="pregnancy-tab" data-toggle="tab" href="#pregnancy" role="tab" aria-controls="pregnancy" aria-selected="false">Pregnancy</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="calving-tab" data-toggle="tab" href="#calving" role="tab" aria-controls="calving" aria-selected="true">Calving</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="delete-tab" data-toggle="tab" href="#delete" role="tab" aria-controls="delete" aria-selected="false">Delete</a>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div class="tab-pane fade show active" id="breeding" role="tabpanel" aria-labelledby="breeding-tab">
        <h5> Breeding information</h5>
        <template v-if="breedings.length === 0">
          <p>There is no breeding data for this animal.</p>
        </template>
        <template v-else>
          <table class="table table table-striped table-hover">
            <thead>
              <tr>
                <th>Date</th>
                <th>Method</th>
                <th>Bull</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="breeding in breedings">
                <td>{{breeding.date}}</td>
                <td>{{breeding.method}}</td>
                <td>{{breeding.bull}}</td>
              </tr>
            </tbody>
          </table>
        </template>
      </div>
      <div class="tab-pane fade" id="health" role="tabpanel" aria-labelledby="health-tab">
        <h5> Health information</h5>
        <template v-if="healthEvents.length === 0">
          <p>There is no health data for this animal.</p>
        </template>
        <template v-else>
          <table class="table table table-striped table-hover">
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
        </template>
      </div>
      <div class="tab-pane fade" id="pregnancy" role="tabpanel" aria-labelledby="pregnancy-tab">
        <h5> Preg-check information</h5>
        <template v-if="cow.type !=='Cow' || pregnancies.length === 0">
          <p>There is no pregnancy data for this animal.</p>
        </template>

        <template v-else>
          <table class="table table table-striped table-hover">
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
        </template>
      </div>
      <div class="tab-pane fade" id="calving" role="tabpanel" aria-labelledby="calving-tab">
        <h5>Calving</h5>
        <template v-if="cow.type !=='Cow' || calvings.length === 0">
          <p>There is no calving data for this animal.</p>
        </template>

        <template v-else>
          <table class="table table table-striped table-hover">
            <thead>
              <tr>
                <th>Season</th>
                <th>Ear tag</th>
                <th>Birthdate</th>
                <th>Sex</th>
                <th>Sire</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="calving in calvings"  >
                <td>{{calving.season}}</td>
                <td>{{calving.calf_id}}</td>
                <td>{{calving.dob}}</td>
                <td>{{calving.sex}}</td>
                <td>{{calving.sire}}</td>
              </tr>
            </tbody>
          </table>
        </template>
      </div>
      <div class="tab-pane fade" id="delete" role="tabpanel" aria-labelledby="delete-tab">
        <h5> Delete</h5>
        <button class="btn btn-danger" type="button" @click="deleteCow()" name="deleteCow">Delete this animal</button>
      </div>
    </div>



  <!-- EDIT ANIMAL Modal -->
      <div class="modal fade" id="editAnimalModal" tabindex="-1" role="dialog" aria-labelledby="editAnimalModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editAnimalModalLabel">Update Animal</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                  <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                      <a class="nav-link active" id="update-tab" data-toggle="tab" href="#update" role="tab" aria-controls="update" aria-selected="true">Update</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="statusUpdate-tab" data-toggle="tab" href="#statusUpdate" role="tab" aria-controls="statusUpdate" aria-selected="false">Status Update</a>
                    </li>

                  </ul>
                  <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="update" role="tabpanel" aria-labelledby="update-tab">
                      <form>
                        <div class="form-group">
                          <label for="editAnimalTagId">Ear Tag Number</label>
                          <input  v-model:value="cow.tag_id" type="text" class="form-control" id="editAnimalTagId" placeholder="Ear tag number">
                        </div>
                        <div class="form-group">
                          <label for="editAnimalType">Type</label>
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
                          <label for="editAnimalPasture">Pasture</label>
                          <select v-model:value="cow.pasture"  class="form-control" id="editAnimalPasture">
                            <option disabled value="">Select a pasture</option>
                            <option v-for="pasture in pastures">{{pasture.name}}</option>
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
                      <form>
                        <div class="form-group">
                          <label for="editAnimalStatus">Status</label>
                          <select v-model:value="cow.status"  class="form-control" id="editAnimalStatus">
                            <option disabled value="">Select animal status</option>
                            <option>Active</option>
                            <option>Sold</option>
                            <option>Deceased</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="editAnimalStatusChangeDate">Status Change Date</label>
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
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary" @click="editAnimal()">Update</button>
                    </div>
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

export default {
  name: 'app',
  data() {
    return {
      msg: 'Animal Information',
      cow: [],
      breedings: [],
      calvings: [],
      healthEvents: [],
      pregnancies: [],
      pastures: []
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

    axios.get('http://127.0.0.1:3000/cattle/' + this.$route.params.id)
      .then((response) => {
        this.cow = response.data
      });
    axios.get('http://127.0.0.1:3000/breeding/' + this.$route.params.id)
      .then((response) => {
        this.breedings = response.data
      });
    axios.get('http://127.0.0.1:3000/calving/' + this.$route.params.id)
      .then((response) => {
        this.calvings = response.data
      });
    axios.get('http://127.0.0.1:3000/health/' + this.$route.params.id)
      .then((response) => {
        this.healthEvents = response.data
      });
    axios.get('http://127.0.0.1:3000/pregnancy/' + this.$route.params.id)
      .then((response) => {
        this.pregnancies = response.data
      });
    axios.get('http://127.0.0.1:3000/pastures')
      .then((response) => {
        this.pastures = response.data
      });
  },
  methods: {
    deleteCow() {
      axios.delete('http://127.0.0.1:3000/cattle/' + this.$route.params.id)
        .then((response) => {
          console.log(response);
          window.location.href = '/cattle';
        })
        .catch((err) => {
          console.log(err.response);
        });

    },
    editAnimal() {

      axios.patch('http://127.0.0.1:3000/cattle/' + this.$route.params.id, {
          tag_id: this.cow.tag_id,
          type: this.cow.type,
          dob: this.cow.dob,
          pasture: this.cow.pasture,
          sire: this.cow.sire,
          dam: this.cow.dam,
          status: this.cow.status,
          status_date: this.cow.status_date,
          weight: this.cow.weight,
          causeOfDeath: this.cow.causeOfDeath,
          status_comments: this.cow.status_comments
        })
        .then(function(response) {
          console.log(response);
          window.location.href = '/cattle';
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
