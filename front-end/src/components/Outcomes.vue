<template lang="html">
<div>
  <div class="card shadow">
    <div class="card-header bg-primary text-white">
        <h3 class="font-weight-bold">{{msg}}</h3>
      </div>
      <div class="card-body p-0 pt-1">
        <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
          <li class="nav-item">
            <a class="nav-link font-weight-bold active" id="sold-tab" data-toggle="tab" href="#sold" role="tab" aria-controls="sold" aria-selected="true">Sold</a>
          </li>
          <li class="nav-item">
            <a class="nav-link font-weight-bold" id="deaths-tab" data-toggle="tab" href="#deaths" role="tab" aria-controls="deaths" aria-selected="false">Deaths</a>
          </li>
        </ul>

      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="sold" role="tabpanel" aria-labelledby="sold-tab">
          <div class="table-responsive">

            <table class="table table table-striped table-hover">
              <thead class="thead-custom-darkgray">
                <tr>
                  <th>Ear tag</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Weight</th>
                  <th>Comments</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                <tr  v-for="cow in cows" v-if="cow.status =='Sold'">
                  <td>{{cow.tag_id}}</td>
                  <td>{{cow.status_date}}</td>
                  <td>{{cow.status}}</td>
                  <td>{{cow.weight}}</td>
                  <td>{{cow.status_comments}}</td>
                  <td><router-link :to="{path: '/outcomes/' + cow.tag_id}"><i class="fa fa-2x fa-chevron-circle-right"></i></router-link></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="tab-pane fade" id="deaths" role="tabpanel" aria-labelledby="deaths-tab">
          <div class="table-responsive">
            <table class="table table table-striped table-hover">
              <thead class="thead-custom-darkgray">
                <tr>
                  <th>Ear tag</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Cause of Death</th>
                  <th>Comments</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                <tr  v-for="cow in cows" v-if="cow.status =='Deceased'">
                  <td>{{cow.tag_id}}</td>
                  <td>{{cow.status_date}}</td>
                  <td>{{cow.status}}</td>
                  <td>{{cow.causeOfDeath}}</td>
                  <td>{{cow.status_comments}}</td>
                  <td><router-link :to="{path: '/outcomes/' + cow.tag_id}"><i class="fa fa-2x fa-chevron-circle-right"></i></router-link></td>
                </tr>
              </tbody>
            </table>
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
      msg: 'Herd Outcomes',
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
    axios.get('http://127.0.0.1:3000/cattle')
      .then((response) => {
        this.cows = response.data
      });
  }
}
</script>

<style lang="css">


</style>
