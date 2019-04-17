<template lang="html">
  <div class="appContent">
    <h5 class="text-right"><router-link :to="{name: 'breeding', params: {user}}">Back to breeding records</router-link></h5>
    <div class="card shadow">
      <div class="card-header">
        <div class="row no-gutters">
            <h3 class="font-weight-bold">{{msg}}</h3>
        </div>
      </div>
      <div>
        <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" id="update-tab" data-toggle="tab" href="#update" role="tab" aria-controls="update" aria-selected="true">Update</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="delete-tab" data-toggle="tab" href="#delete" role="tab" aria-controls="delete" aria-selected="false">Delete</a>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="update" role="tabpanel" aria-labelledby="update-tab">
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-4 col-sm-0">
                </div>
                <div class="col-md-8 col-sm-12 ">
                  <small class="float-right text-secondary mb-3">Fields marked with (*) are required.</small>
                </div>
              </div>
            </div>
            <div class="errorContainer text-danger custom-form">
              <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                  <li v-for="error in errors">{{ error }}</li>
                </ul>
              </p>
            </div>
            <form class="custom-form">
              <div class="form-group">
                <label for="editBreedingTagId">Ear Tag Number*</label>
                <select v-model:value="breeding.tag_id"  class="form-control" id="editBreedingTagId">
                  <option disabled value="">Select an active animal</option>
                  <option v-for="cow in cows" v-if="cow.status =='Active' && cow.type =='Cow'">{{cow.tag_id}}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="editBreedingMethod">Method*</label>
                <select v-model:value="breeding.method"  class="form-control" id="editBreedingMethod">
                  <option disabled value="">Select breeding method</option>
                  <option>AI</option>
                  <option>Embryo</option>
                  <option>Natural</option>
                </select>
              </div>
              <div class="form-group">
                <label for="editBreedingDate">Date*</label>
                <input v-model:value="breeding.date"  type="date" class="form-control" id="editBreedingDate" placeholder="mm/dd/yyyy">
              </div>
              <div class="form-group">
                <label for="editBreedingSire">Sire*</label>
                <input v-model:value="breeding.sire"  type="text" class="form-control" id="editBreedingSire" placeholder="No sire found">
              </div>
              <div class="form-group">
                <label for="editBreedingTech">Technician</label>
                <input v-model:value="breeding.technician"  type="text" class="form-control" id="editBreedingTech" placeholder="No technician found">
              </div>
              <div class="form-group">
                <label for="editBreedingComments">Comments</label>
                <input v-model:value="breeding.comments" type="text" class="form-control" id="editBreedingComments" placeholder="No comments found">
              </div>
              <div class="errorContainer text-danger">
                <p v-if="errors.length">
                  <b>Please correct the following error(s):</b>
                  <ul>
                    <li v-for="error in errors">{{ error }}</li>
                  </ul>
                </p>
              </div>
              <div class="form-group float-right">
                <button type="button" class="btn btn-secondary" @click= "cancel()">Cancel</button>
                <button type="button" class="btn btn-primary" @click="checkForm($event); editBreeding()">Update</button>
              </div>
            </form>
          </div>
          <div class="tab-pane fade text-center" id="delete" role="tabpanel" aria-labelledby="delete-tab">
              <button class="btn btn-danger" type="button" @click="deleteBreeding()" name="deleteBreedingEvent">Delete this record</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import firebase from 'firebase';
import { authorization } from './mixins/auth';

export default {
  data() {
    return {
      msg: 'Edit breeding record',
      breeding: [],
      cows: [],
      user: null,
      errors: []
    }
  },
  mixins: [authorization],
  created() {
    this.user = firebase.auth().currentUser.uid;
    this.fetchData();
  },
  methods: {
    cancel() {
      this.$router.push("/" + this.user + "/breeding");
    },
    checkForm: function(e) {
      if (this.breeding.tag_id && this.breeding.date && this.breeding.method && this.breeding.sire) return true;
      this.errors = [];
      if (!this.breeding.tag_id) this.errors.push("Ear tag is required.");
      if (!this.breeding.date) this.errors.push("Breeding date is required.");
      if (!this.breeding.method) this.errors.push("Breeding method is required.");
      if (!this.breeding.sire) this.errors.push("Sire is required.");
      e.preventDefault();
    },
    deleteBreeding() {
      axios.delete('https://fathomless-plateau-17194.herokuapp.com/' + this.$route.params.user + '/breedingevent/' + this.$route.params.id)
        .then(this.$router.push("/" + this.user + "/breeding"))
        .catch((err) => {
          console.log(err);
        });
    },
    editBreeding() {
      axios.patch('https://fathomless-plateau-17194.herokuapp.com/' + this.$route.params.user + '/breedingevent/' + this.$route.params.id, {
          tag_id: this.breeding.tag_id,
          date: this.breeding.date,
          method: this.breeding.method,
          sire: this.breeding.sire,
          technician: this.breeding.technician,
          comments: this.breeding.comments
        })
        .then(this.$router.push("/" + this.user + "/breeding"))
        .catch((error) => {
          console.log(error);
        });
    },
    fetchData() {
      axios.get('https://fathomless-plateau-17194.herokuapp.com/' + this.$route.params.user + '/breedingevent/' + this.$route.params.id)
        .then((response) => {
          this.breeding = response.data
        });
      axios.get('https://fathomless-plateau-17194.herokuapp.com/' + this.$route.params.user + '/cattle')
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
