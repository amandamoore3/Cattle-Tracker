<template lang="html">
<div class="appContent">
  <div class="card shadow">
    <div class="card-header bg-primary text-white">
      <h3 class="font-weight-bold">{{msg}}</h3>
    </div>

    <template v-if="cows.length > 0">
      <div>
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
                    <td><router-link :to="{name: 'outcomes-records', params:{user, id: cow.tag_id}}"><i class="fa fa-2x fa-chevron-circle-right"></i></router-link></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="tab-pane fade" id="deaths" role="tabpanel" aria-labelledby="deaths-tab">
            <div class="table-responsive">
              <table class="table table-striped table-hover">
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
                    <td><router-link :to="{name: 'outcomes-records', params:{user, id: cow.tag_id}}"><i class="fa fa-2x fa-chevron-circle-right"></i></router-link></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <h6 class= "p-3">There is no outcome data to show.  Add outcomes by editing the animal you wish to update.</h6>
    </template>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import firebase from 'firebase';
import { authorization } from './mixins/auth';


export default {
  data() {
    return {
      msg: 'Herd Outcomes',
      cows: [],
      user: null
    }
  },
  mixins: [authorization],
  created() {
    this.user = firebase.auth().currentUser.uid;
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios.get('https://fathomless-plateau-17194.herokuapp.com/' + this.$route.params.user + '/cattle')
        .then((response) => {
          this.cows = response.data
        });
    }
  },
  watch: {
    '$route': 'fetchData'
  }
}
</script>

<style lang="css">


</style>
