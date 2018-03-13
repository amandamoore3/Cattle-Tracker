<template>
<div id="app">
  <div class="container-fluid">
    <div class="row no-gutters">
      <div class="col-12">
        <template v-if="user">
          <nav class="navbar navbar-dark fixed-top navbar-expand-lg custom-nav shadow">
            <router-link :to="{ name: 'home'}" class="navbar-brand">Cattle-Tracks</router-link>
            <button class="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <router-link :to="{ name: 'cattle', params:{user}}" class="nav-link">Active Cattle <span class="sr-only">(current)</span></router-link>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Herd
                  </a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <router-link :to="{name: 'breeding', params: {user}}" class="dropdown-item">Breeding</router-link>
                    <router-link :to="{name: 'calving', params: {user}}" class="dropdown-item">Calving</router-link>
                    <router-link :to="{name: 'health', params: {user}}" class="dropdown-item">Health</router-link>
                    <router-link :to="{name: 'pasture-movements', params: {user}}" class="dropdown-item">Movements</router-link>
                    <router-link :to="{name: 'outcomes', params: {user}}" class="dropdown-item">Outcomes</router-link>
                    <router-link :to="{name: 'pastures', params: {user}}" class="dropdown-item">Pastures</router-link>
                    <router-link :to="{name: 'preg-check', params: {user}}" class="dropdown-item">Preg-check</router-link>
                  </div>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#" @click="logout()">Log out</a>
                </li>
              </ul>
            </div>
          </nav>
        </template>
        <template v-else>
          <nav class="navbar navbar-dark fixed-top navbar-expand-lg custom-nav shadow">
            <router-link :to="{ name: 'home'}" class="navbar-brand">Cattle-Tracks</router-link>
            <button class="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <router-link :to="{name: 'login'}" class="nav-link">Login</router-link>
                </li>
              </ul>
            </div>
          </nav>
        </template>
      </div>
    </div>
  </div>

  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <transition name="fade" mode="out-in">
          <router-view class="paddingContent"></router-view>
        </transition>
      </div>
    </div>
  </div>
  <footer class="custom-footer">
    <p class="text-center pt-1">Created by Amanda Moore, 2018</p>
  </footer>
</div>
</template>

<script>
import firebase from 'firebase';
export default {
  name: 'app',
  beforeCreate() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //forces conditional rendering
        this.user = user.uid
        // console.log("appbeforecreate:" + this.user);
        // this.$bindAsArray('items', db.ref(`items/${user.uid}`))
      } else {
        this.$router.push('/login');
      }
    })
  },
  data() {
    return {
      user: null
      // items: []
    }
  },
  // beforeCreate() {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       //capture user id and push to uid array.  add user id to each schema. capture uid and add to object sent to db.
  //     } else {
  //       this.$router.push('/login');
  //     }
  //   })
  // },
  created() {
    this.user = firebase.auth().currentUser.uid;
    // console.log("app:" + this.user);
  },
  methods: {
    logout() {
      firebase.auth().signOut();
      this.$router.push('/login');
    }
  }
}
</script>

<style lang="scss">

</style>
