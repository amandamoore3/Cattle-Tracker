<template lang="html">
  <div>
    <h1>{{msg}}</h1>
    <router-link :to="{path: '/pastures'}">View all pastures</router-link>

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
            <label for="editPastureName">Name</label>
            <input v-model:value="pasture.name"  type="text" class="form-control" id="editPastureName">
          </div>
          <div class="form-group">
            <label for="editPastureComments">Comments</label>
            <input v-model:value="pasture.comments" type="text" class="form-control" id="editPastureComments" placeholder="No comments found">
          </div>
          <div class="form-group">
            <button type="button" class="btn btn-secondary" @click= "cancel()">Cancel</button>
            <button type="button" class="btn btn-primary" @click="editPasture()">Update</button>
          </div>

        </form>
      </div>
      <div class="tab-pane fade" id="delete" role="tabpanel" aria-labelledby="delete-tab">
        <div class="form-group">
          <h5> Delete</h5>
          <button class="btn btn-danger" type="button" @click="deletePasture()" name="deletePasture">Delete this pasture</button>
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
      msg: 'Edit this pasture',
      pasture: []
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
    axios.get('http://127.0.0.1:3000/pastures/' + this.$route.params.id)
      .then((response) => {
        this.pasture = response.data
      });

  },
  methods: {
    logOut() {
      firebase.auth().signOut();
      window.location.href = '/';
    },
    cancel() {
      window.location.href = '/pastures';
    },
    deletePasture() {
      // console.log(this.$route.params.id);
      axios.delete('http://127.0.0.1:3000/pastures/' + this.$route.params.id)
        .then((response) => {
          console.log(response);
          window.location.href = '/pastures';
        })
        .catch((err) => {
          console.log(err.response);
        });

    },
    editPasture() {
      axios.patch('http://127.0.0.1:3000/pastures/' + this.$route.params.id, {
          name: this.breeding.name,
          comments: this.breeding.comments
        })
        .then(function(response) {
          console.log(response);
          window.location.href = '/pastures';
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
