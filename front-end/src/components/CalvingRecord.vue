<template lang="html">
  <div class="appContent">
    <h5 class="text-right"><router-link :to="{name: 'calving', params: {user}}">Herd calving records</router-link></h5>
    <div class="card shadow">
      <div class="card-header">
        <h3 class="font-weight-bold">{{msg}}</h3>
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
            <form class="custom-form">
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
              <div class="form-group">
                <label for="addCalvingTagId">Ear Tag Number*</label>
                <select v-model="calving.tag_id"  class="form-control" id="addCalvingTagId">
                  <option disabled value="">Select an active animal</option>
                  <option v-for="cow in cows" v-if="cow.status =='Active' && cow.type =='Cow'">{{cow.tag_id}}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="addCalvingCalfId">Calf Ear Tag*</label>
                <input v-model="calving.calf_id" type="text" class="form-control" id="addCalvingCalfId" placeholder="Calf ear tag number">
              </div>
              <div class="form-group">
                <label for="addCalvingSeason">Season*</label>
                <input v-model="calving.season" type="text" class="form-control" id="addCalvingSeason">
              </div>
              <div class="form-group">
                <label for="addCalvingDob">Birth Date*</label>
                <input v-model="calving.dob" type="date" class="form-control" id="addCalvingDob" placeholder="mm/dd/yyyy">
              </div>
              <div class="form-group">
                <label for="addCalvingSex">Sex*</label>
                <select v-model="calving.sex" class="form-control" id="addCalvingSex">
                  <option disabled value="">Select sex</option>
                  <option>Heifer</option>
                  <option>Bull</option>
                </select>
              </div>
              <div class="form-group">
                <label for="addCalvingSire">Sire*</label>
                <input v-model="calving.sire" type="text" class="form-control" id="addCalvingSire" placeholder="Sire">
              </div>
              <div class="form-group">
                <label for="addCalvingComments">Comments</label>
                <input v-model="calving.comments" type="text" class="form-control" id="addCalvingComments" placeholder="Comments">
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
                <button type="button" class="btn btn-primary" @click="checkForm($event); editCalving();">Update</button>
              </div>
            </form>
          </div>
          <div class="tab-pane fade text-center" id="delete" role="tabpanel" aria-labelledby="delete-tab">
            <!-- <div class="form-group "> -->
              <button class="btn btn-danger" type="button" @click="deleteCalving()" name="deleteCalvingEvent">Delete this Record</button>
            <!-- </div> -->
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
      msg: 'Edit calving record',
      calving: [],
      cows: [],
      user: null,
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
    axios.get('http://127.0.0.1:3000/ ' + this.$route.params.user + '/calvingevent/' + this.$route.params.id)
      .then((response) => {
        this.calving = response.data
      });
    axios.get('http://127.0.0.1:3000/' + this.$route.params.user + '/cattle')
      .then((response) => {
        this.cows = response.data
      });
  },
  methods: {
    cancel() {
      this.$router.push("/" + this.user + "/calving");
    },
    checkForm: function(e) {
      if (this.calving.tag_id && this.calving.calf_id && this.calving.season && this.calving.sex && this.calving.dob && this.calving.sire) return true;
      this.errors = [];
      if (!this.calving.tag_id) this.errors.push("Cow ear tag is required.");
      if (!this.calving.calf_id) this.errors.push("Calf ear tag is required.");
      if (!this.calving.season) this.errors.push("Calving Season is required.");
      if (!this.calving.dob) this.errors.push("Calf birth date is required.");
      if (!this.calving.sex) this.errors.push("Calf sex is required.");
      if (!this.calving.sire) this.errors.push("Sire is required.");
      e.preventDefault();
    },
    deleteCalving() {
      axios.delete('http://127.0.0.1:3000/' + this.$route.params.user + '/calvingevent/' + this.$route.params.id)
        .then((response) => {
          console.log(response);
          this.$router.push("/" + this.user + "/calving");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editCalving() {
      axios.patch('http://127.0.0.1:3000/' + this.$route.params.user + '/calvingevent/' + this.$route.params.id, {
          tag_id: this.calving.tag_id,
          calf_id: this.calving.calf_id,
          season: this.calving.season,
          dob: this.calving.dob,
          sex: this.calving.sex,
          sire: this.calving.sire,
          comments: this.calving.comments
        })
        .then((response) => {
          console.log(response);
          this.$router.push("/" + this.user + "/calving");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
</script>

<style lang="css">
</style>
