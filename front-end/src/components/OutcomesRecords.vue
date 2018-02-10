<template lang="html">
  <div>
    <h5 class="text-right"><router-link :to="{path: '/outcomes'}">Back to outcomes</router-link></h5>
    <div class="card">
      <div class="card-header">
        <h3 class="font-weight-bold">{{msg}}</h3>
      </div>
      <div class="card-body">
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
                <label for="editAnimalOutcomeStatus">Status</label>
                <select v-model:value="cow.status"  class="form-control" id="editAnimalOutcomeStatus">
                  <option disabled value="">Select animal status</option>
                  <option>Active</option>
                  <option>Sold</option>
                  <option>Deceased</option>
                </select>
              </div>
              <div class="form-group">
                <label for="editAnimalOutcomeStatusChangeDate">Status Change Date</label>
                <input v-model:value="cow.status_date" type="date" class="form-control" id="editAnimalOutcomeStatusChangeDate">
              </div>
              <div class="form-group">
                <label for="editAnimalOutcomeWeight">Weight</label>
                <input v-model:value="cow.weight" type="text" class="form-control" id="editAnimalOutcomeWeight">
              </div>
              <div class="form-group">
                <label for="editAnimalOutcomeCauseOfDeath">Cause of Death</label>
                <input v-model:value="cow.causeOfDeath" type="text" class="form-control" id="editAnimalOutcomeCauseOfDeath">
              </div>
              <div class="form-group">
                <label for="editAnimalOutcomeStatusComments">Status change comments</label>
                <input v-model:value="cow.status_comments" type="text" class="form-control" id="editAnimalOutcomeStatusComments">
              </div>
              <div class="form-group float-right">
                <button type="button" class="btn btn-secondary" @click= "cancel()">Cancel</button>
                <button type="button" class="btn btn-primary" @click="editOutcome()">Update</button>
              </div>
            </form>
          </div>
          <div class="tab-pane fade" id="delete" role="tabpanel" aria-labelledby="delete-tab">
            <div class="form-group">
              <h5>Delete</h5>
              <button class="btn btn-danger" type="button" @click="deleteOutcome()" name="deleteOutcomeRecord">Delete this record</button>
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
  name: 'outcomes-records',
  data() {
    return {
      msg: 'Update this record',
      cow: []
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
  },
  methods: {
    cancel() {
      window.location.href = '/outcomes';
    },
    deleteOutcome() {
      // console.log(this.$route.params.id);
      axios.delete('http://127.0.0.1:3000/cattle/' + this.$route.params.id)
        .then((response) => {
          console.log(response);
          window.location.href = '/outcomes';
        })
        .catch((err) => {
          console.log(err.response);
        });

    },
    editOutcome() {
      axios.patch('http://127.0.0.1:3000/cattle/' + this.$route.params.id, {
          status: this.cow.status,
          status_date: this.cow.status_date,
          weight: this.cow.weight,
          causeOfDeath: this.cow.causeOfDeath,
          status_comments: this.cow.status_comments
        })
        .then(function(response) {
          console.log(response);
          window.location.href = '/outcomes';
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
