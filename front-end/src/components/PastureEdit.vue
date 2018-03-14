<template lang="html">
  <div class="appContent">
    <h5 class="text-right"><router-link :to="{path: '/pastures'}">View all pastures</router-link></h5>
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
                <label for="editPastureName">Pasture Name*</label>
                <input v-model:value="pasture.name"  type="text" class="form-control" id="editPastureName">
              </div>
              <div class="form-group">
                <label for="editPastureComments">Comments</label>
                <input v-model:value="pasture.comments" type="text" class="form-control" id="editPastureComments" placeholder="No comments found">
              </div>
              <div class="form-group float-right">
                <button type="button" class="btn btn-secondary" @click= "cancel()">Cancel</button>
                <button type="button" class="btn btn-primary" @click="checkForm($event); editPasture();">Update</button>
              </div>
            </form>
          </div>
          <div class="tab-pane fade text-center" id="delete" role="tabpanel" aria-labelledby="delete-tab">
            <button class="btn btn-danger" type="button" @click="deletePasture()" name="deletePasture">Delete this pasture</button>
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
      msg: 'Edit pasture',
      pasture: [],
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
    this.fetchData();
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    cancel() {
      this.$router.push("/pastures");
    },
    checkForm: function(e) {
      if (this.pasture.name) return true;
      this.errors = [];
      if (!this.pasture.name) this.errors.push("Pasture name required.");
      e.preventDefault();
    },
    deletePasture() {
      axios.delete('http://127.0.0.1:3000/pastures/' + this.$route.params.id)
        .then((response) => {
          console.log(response);
          this.$router.push("/pastures");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editPasture() {
      axios.patch('http://127.0.0.1:3000/pastures/' + this.$route.params.id, {
          name: this.pasture.name,
          comments: this.pasture.comments
        })
        .then((response) => {
          console.log(response);
          this.$router.push("/pastures");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchData() {
      axios.get('http://127.0.0.1:3000/pastures/' + this.$route.params.id)
        .then((response) => {
          this.pasture = response.data
        });
    }
  }
}
</script>

<style lang="css">
</style>
