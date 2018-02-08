<template lang="html">
  <div>
    <h1>{{msg}}</h1>
    <router-link :to="{path: '/breeding'}">Back to herd breeding information</router-link>

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
            <label for="editBreedingBull">Bull</label>
            <select v-model:value="breeding.bull"  class="form-control" id="editBreedingBull">
              <option disabled value="Select an active Bull">Select an active bull</option>
              <option v-for="cow in cows" v-if="cow.type == 'Bull'">{{cow.tag_id}}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="editBreedingTech">Technician</label>
            <input v-model:value="breeding.technician"  type="text" class="form-control" id="editBreedingTech" placeholder="No technician found">
          </div>
          <div class="form-group">
            <label for="editBreedingComments">Comments</label>
            <input v-model:value="breeding.comments" type="text" class="form-control" id="editBreedingComments" placeholder="No comments found">
          </div>
          <div class="form-group">
            <button type="button" class="btn btn-secondary" @click= "cancel()">Cancel</button>
            <button type="button" class="btn btn-primary" @click="editBreeding()">Update</button>
          </div>

        </form>
      </div>
      <div class="tab-pane fade" id="delete" role="tabpanel" aria-labelledby="delete-tab">
        <div class="form-group">
          <h5> Delete</h5>
          <button class="btn btn-danger" type="button" @click="deleteBreeding()" name="deleteBreedingEvent">Delete this breeding event</button>
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
      msg: 'Edit this breeding record',
      breeding: [],
      cows: []
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
      window.location.href = '/breeding';
    },
    deleteBreeding() {
      // console.log(this.$route.params.id);
      axios.delete('http://127.0.0.1:3000/breedingevent/' + this.$route.params.id)
        .then((response) => {
          console.log(response);
          window.location.href = '/breeding';
        })
        .catch((err) => {
          console.log(err.response);
        });

    },
    editBreeding() {
      axios.patch('http://127.0.0.1:3000/breedingevent/' + this.$route.params.id, {
          tag_id: this.breeding.tag_id,
          date: this.breeding.date,
          method: this.breeding.method,
          bull: this.breeding.bull,
          technician: this.breeding.technician,
          comments: this.breeding.comments,

        })
        .then(function(response) {
          console.log(response);
          window.location.href = '/breeding';
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
