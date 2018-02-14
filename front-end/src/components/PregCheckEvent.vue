<template lang="html">
  <div>
    <h5 class="text-right"><router-link :to="{path: '/pregnancy'}">All Preg-Check Records</router-link></h5>
    <div class="card shadow">
      <div class="card-header">
        <h3 class="font-weight-bold">{{msg}}</h3>
      </div>
      <div class="card-body p-0 pt-1">
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
              <div class="form-group">
                <label for="editPregCheckTagId">Ear Tag Number</label>
                <select v-model:value="pregCheck.tag_id"  class="form-control" id="editPregCheckTagId">
                  <option disabled value="">Select an active animal</option>
                  <option v-for="cow in cows" v-if="cow.status =='Active'">{{cow.tag_id}}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="editPregCheckDate">Date</label>
                <input v-model:value="pregCheck.date"  type="date" class="form-control" id="editPregCheckDate" placeholder="mm/dd/yyyy">
              </div>
              <div class="form-group">
                <label for="editPregCheckMethod">Method</label>
                <select v-model:value="pregCheck.method"  class="form-control" id="editPregCheckMethod" placeholder="No method found">
                  <option disabled value="">Select preg-check method</option>
                  <option>Rectal palpitation</option>
                  <option>Ultrasound</option>
                  <option>Blood test</option>
                </select>
              </div>
              <div class="form-group">
                <label for="editPregCheckResult">Result</label>
                <input v-model:value="pregCheck.result"  type="text" class="form-control" id="editPregCheckResult" >
              </div>
              <div class="form-group">
                <label for="editPregCheckComments">Comments</label>
                <input v-model:value="pregCheck.comments" type="text" class="form-control" id="editPregCheckComments" placeholder="No comments found">
              </div>
              <div class="form-group float-right">
                <button type="button" class="btn btn-secondary" @click= "cancel()">Cancel</button>
                <button type="button" class="btn btn-primary" @click="editPregCheck()">Update</button>
              </div>
            </form>
          </div>
          <div class="tab-pane fade" id="delete" role="tabpanel" aria-labelledby="delete-tab">
            <div class="form-group">
              <button class="btn btn-danger mr-5 mb-3 float-right" type="button" @click="deletePregCheck()" name="deletePregCheckEvent">Delete this record</button>
            </div>
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
      msg: 'Edit preg-check record',
      pregCheck: [],
      cows: []
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
    axios.get('http://127.0.0.1:3000/pregcheck/' + this.$route.params.id)
      .then((response) => {
        this.pregCheck = response.data
      });
    axios.get('http://127.0.0.1:3000/cattle')
      .then((response) => {
        this.cows = response.data
      });
  },
  methods: {

    cancel() {
      this.$router.push("/pregnancy");
    },
    deletePregCheck() {
      // console.log(this.$route.params.id);
      axios.delete('http://127.0.0.1:3000/pregnancy/' + this.$route.params.id)
        .then((response) => {
          console.log(response);
          window.location.href = '/pregnancy';
        })
        .catch((err) => {
          console.log(err.response);
        });

    },
    editPregCheck() {
      axios.patch('http://127.0.0.1:3000/pregnancy/' + this.$route.params.id, {
          tag_id: this.pregCheck.tag_id,
          date: this.pregCheck.date,
          method: this.pregCheck.method,
          result: this.pregCheck.result,
          comments: this.pregCheck.comments
        })
        .then(function(response) {
          console.log(response);
          window.location.href = '/pregnancy';
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
