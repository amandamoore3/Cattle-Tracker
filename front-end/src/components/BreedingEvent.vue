<template lang="html">
  <div>
    <h5 class="text-right"><router-link :to="{path: '/breeding'}">Back to breeding records</router-link></h5>
    <div class="card shadow">
      <div class="card-header">
        <div class="row no-gutters">
            <h3 class="font-weight-bold">{{msg}}</h3>
        </div>
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
                <label for="editBreedingTagId">Ear Tag Number</label>
                <select v-model:value="breeding.tag_id"  class="form-control" id="editBreedingTagId">
                  <option disabled value="">Select an active animal</option>
                  <option v-for="cow in cows" v-if="cow.status =='Active'">{{cow.tag_id}}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="editBreedingMethod">Method</label>
                <select v-model:value="breeding.method"  class="form-control" id="editBreedingMethod">
                  <option disabled value="">Select breeding method</option>
                  <option>AI</option>
                  <option>Embryo</option>
                  <option>Natural</option>
                </select>
              </div>
              <div class="form-group">
                <label for="editBreedingDate">Date</label>
                <input v-model:value="breeding.date"  type="date" class="form-control" id="editBreedingDate" placeholder="mm/dd/yyyy">
              </div>
              <div class="form-group">
                <label for="editBreedingSire">Sire</label>
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
              <div class="form-group float-right">
                <button type="button" class="btn btn-secondary" @click= "cancel()">Cancel</button>
                <button type="button" class="btn btn-primary" @click="editBreeding()">Update</button>
              </div>
            </form>
          </div>
          <div class="tab-pane fade" id="delete" role="tabpanel" aria-labelledby="delete-tab">
            <div class="form-group">
              <button class="btn btn-danger mr-5 mb-3 float-right" type="button" @click="deleteBreeding()" name="deleteBreedingEvent">Delete this record</button>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
    <!-- </div>
  </div> -->
</template>

<script>
import axios from 'axios';
import firebase from 'firebase';

export default {
  data() {
    return {
      msg: 'Edit breeding record',
      breeding: [],
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
    axios.get('http://127.0.0.1:3000/breedingevent/' + this.$route.params.id)
      .then((response) => {
        this.breeding = response.data
      });
    axios.get('http://127.0.0.1:3000/cattle')
      .then((response) => {
        this.cows = response.data
      });
  },
  methods: {
    cancel() {
      this.$router.push("/breeding");
    },
    deleteBreeding() {
      let self = this;
      axios.delete('http://127.0.0.1:3000/breedingevent/' + this.$route.params.id)
        .then((response) => {
          console.log(response);
          self.$router.push("/breeding");
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    editBreeding() {
      let self = this;
      axios.patch('http://127.0.0.1:3000/breedingevent/' + this.$route.params.id, {
          tag_id: this.breeding.tag_id,
          date: this.breeding.date,
          method: this.breeding.method,
          sire: this.breeding.sire,
          technician: this.breeding.technician,
          comments: this.breeding.comments,

        })
        .then(function(response) {
          console.log(response);
          self.$router.push("/breeding");
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
