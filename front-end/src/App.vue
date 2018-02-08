<template>
<div id="app">
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">Cowculator</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <!-- <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a> -->
          <router-link :to="{path: '/cattle'}" class="nav-link">Active Cattle <span class="sr-only">(current)</span></router-link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Herd
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <router-link :to="{path: '/breeding'}" class="dropdown-item">Breeding</router-link>
            <router-link :to="{path: '/health'}" class="dropdown-item">Health</router-link>
            <router-link :to="{path: '/outcomes'}" class="dropdown-item">Outcomes</router-link>
            <router-link :to="{path: '/pastures'}" class="dropdown-item">Pastures</router-link>
            <router-link :to="{path: '/pregnancy'}" class="dropdown-item">Preg-check</router-link>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click="logout()">Log out</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>

      </ul>
    </div>
  </nav>

  <router-view class="appContent"></router-view>

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

  // data() {
  //
  // }
}
</script>

<style lang="scss">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // text-align: center;
    color: #2c3e50;
    width: 100%;

}

.appContent {
    max-width: 90%;
    margin: 0 auto;

}

// h1,
// h2 {
//     font-weight: normal;
// }
//
// ul {
//     list-style-type: none;
//     padding: 0;
// }
//
// li {
//     display: inline-block;
//     margin: 0 10px;
// }
//
// a {
//     color: #42b983;
// }
</style>
