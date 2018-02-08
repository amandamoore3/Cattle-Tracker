<template lang="html">
<div>
    <h1>{{msg}}</h1>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addPregCheckModal">
      Add preg-check
    </button>
    <table class="table table table-striped table-hover">
    <thead>
      <tr>
        <th>Ear Tag</th>
        <th>Date</th>
        <th>Method</th>
        <th>Result</th>
        <th>Edit</th>
      </tr>
    </thead>
    <tbody>
      <tr  v-for="pregCheck in pregChecks" >
        <td>{{pregCheck.tag_id}}</td>
        <td>{{pregCheck.date}}</td>
        <td>{{pregCheck.method}}</td>
        <td>{{pregCheck.result}}</td>
        <td><router-link :to="{path: '/pregcheck/' + pregCheck._id}"><i class="fa fa-2x fa-pencil"></i></router-link></td>
      </tr>
    </tbody>
  </table>

  <!-- ADD Modal -->
  <div class="modal fade" id="addPregCheckModal" tabindex="-1" role="dialog" aria-labelledby="addPregCheckModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addPregCheckModalLabel">Add New Preg-check</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="addPregCheckTagId">Ear Tag #</label>
              <select v-model="newPregCheck.tag_id"  class="form-control" id="addPregCheckTagId">
                <option disabled value="">Select an active animal</option>
                <option v-for="cow in cows" v-if="cow.status =='Active'">{{cow.tag_id}}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="addPregCheckDate">PregCheck date</label>
              <input v-model="newPregCheck.date" type="date" class="form-control" id="addPregCheckDate" placeholder="mm/dd/yyyy">
            </div>
            <div class="form-group">
              <label for="addPregCheckMethod">Type</label>
              <select v-model="newPregCheck.method" class="form-control" id="addPregCheckMethod">
                <option disabled value="">Select preg-check method</option>
                <option>Rectal palpitation</option>
                <option>Ultrasound</option>
                <option>Blood test</option>
              </select>
            </div>
            <div class="form-group">
              <label for="addPregCheckresult">Preg-Check result</label>
              <input v-model="newPregCheck.result" type="text" class="form-control" id="addPregCheckName" placeholder="PregCheck result">
            </div>
            <div class="form-group">
              <label for="addPregCheckComments">Comments</label>
              <input v-model="newPregCheck.comments" type="text" class="form-control" id="addPregCheckComments" placeholder="Comments">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="addPregCheck()">Add</button>
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
      msg: 'All Preg-check Info',
      pregChecks: [],
      cows: [],
      newPregCheck: {
        tag_id: "",
        date: "",
        method: "",
        result: "",
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
    axios.get('http://127.0.0.1:3000/pregnancy')
      .then((response) => {
        this.pregChecks = response.data
      });
    axios.get('http://127.0.0.1:3000/cattle')
      .then((response) => {
        this.cows = response.data
      });
  },
  methods: {
    addPregCheck() {
      let newPregCheck = {
        tag_id: this.newPregCheck.tag_id,
        date: this.newPregCheck.date,
        method: this.newPregCheck.method,
        result: this.newPregCheck.result,
        comments: this.newPregCheck.comments
      }
      console.log(newPregCheck);
      axios.post('http://127.0.0.1:3000/pregnancy', newPregCheck)
        .then((response) => {
          console.log(response);
          window.location.href = '/pregnancy';
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
