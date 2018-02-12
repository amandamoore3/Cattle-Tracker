<template lang="html">
<div>
  <div class="card shadow">
  <div class="card-header bg-primary text-white">
      <div class="row no-gutters">
        <div class="col-8">
          <h3 class="font-weight-bold">{{msg}}</h3>
        </div>
        <div class="col-4">
          <h5 class="text-right"><a href="#" class="text-white"  data-toggle="modal" data-target="#addPastureModal">Add Pasture</a></h5>
        </div>
      </div>
    </div>
    <!-- <div class="card-body"> -->
      <div class="table-responsive">
        <table class="table table table-striped table-hover">
          <thead class="thead-custom-darkgray">
            <tr>
              <th>Pasture</th>
              <th>Total #</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr  v-for="pasture in pastures" >
              <td>{{pasture.name}}</td>
              <td>{{addAnimals}}</td>
              <td><router-link :to="{path: '/pastures/' + pasture._id}"><i class="fa fa-2x fa-pencil"></i></router-link></td>
            </tr>
          </tbody>
        </table>
      </div>
    <!-- </div> -->
  </div>

  <!-- ADD Modal -->
    <div class="modal fade" id="addPastureModal" tabindex="-1" role="dialog" aria-labelledby="addPastureModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header card-header">
            <h5 class="modal-title text-primary font-weight-bold" id="addPastureModalLabel">Add New Pasture</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="addPasturename">Pasture name</label>
                <input v-model="newPasture.name" type="text" class="form-control" id="addPastureName" placeholder="Pasture name">

              </div>
              <div class="form-group">
                <label for="addPastureComments">Comments</label>
                <input v-model="newPasture.comments" type="text" class="form-control" id="addPastureComments" placeholder="Comments">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="addPasture()">Add</button>
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
      msg: 'Pastures',
      pastures: [],
      cows: [],
      newPasture: {
        name: "",
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
    axios.get('http://127.0.0.1:3000/pastures')
      .then((response) => {
        this.pastures = response.data
      });
    axios.get('http://127.0.0.1:3000/cattle')
      .then((response) => {
        this.cows = response.data
      });
  },
  computed: {
    addAnimals: function() {
      let cow = this.cows;
      let pasture = this.pastures;
      let sum = 0;
      // console.log(this.cows);
      // let sum = 0;
      // for (let i = 0; i < cow.length; i++) {
      //   sum += 1;
      // }
      // return sum;


      for (let i = 0; i < cow.length; i++) {

        if (cow[i].status == 'Active' && cow[i].pasture == pasture.name) {
          sum += 1;
        }

      }
      return sum;
    }
  },
  methods: {
    addPasture() {
      let newPasture = {
        name: this.newPasture.name,
        comments: this.newPasture.comments
      }
      console.log(newPasture);
      axios.post('http://127.0.0.1:3000/pastures', newPasture)
        .then((response) => {
          console.log(response);
          window.location.href = '/pastures';
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
