<template>
<div id="app">
  <div class="container-fluid">
    <div class="row no-gutters">
      <div class="col-12">
        <nav class="navbar navbar-dark fixed-top navbar-expand-lg custom-nav shadow">
          <a class="navbar-brand" href="#">Cowculator</a>
          <button class="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
        </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link :to="{path: '/cattle'}" class="nav-link">Active Cattle <span class="sr-only">(current)</span></router-link>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Herd
                  </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <router-link :to="{path: '/breeding'}" class="dropdown-item">Breeding</router-link>
                  <router-link :to="{path: '/calving'}" class="dropdown-item">Calving</router-link>
                  <router-link :to="{path: '/health'}" class="dropdown-item">Health</router-link>
                  <router-link :to="{path: '/outcomes'}" class="dropdown-item">Outcomes</router-link>
                  <router-link :to="{path: '/pastures'}" class="dropdown-item">Pastures</router-link>
                  <router-link :to="{path: '/pregnancy'}" class="dropdown-item">Preg-check</router-link>
                </div>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" @click="logout()">Log out</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </div>

  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <router-view class="appContent"></router-view>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import firebase from 'firebase';
export default {
  name: 'app',
  methods: {
    logout() {
      firebase.auth().signOut();
      window.location.href = '/';
    }
  }
}
</script>

<style lang="scss">

</style>
