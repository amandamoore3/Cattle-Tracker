<template>
<div class="appContent">
  <div class="card">
    <div class="card-header">
      Register and sign in below
    </div>
    <div class="card-block">
      <div id="firebaseui-container"></div>
    </div>
  </div>

</div>
</template>

<script>
import firebase from 'firebase'
import firebaseui from 'firebaseui'
import { config } from '../utils/firebaseConfig.js'

export default {
  name: 'login',
  mounted() {
    let uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    };
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    ui.start('#firebaseui-container', uiConfig);

    // let ui = new firebaseui.auth.AuthUI(firebase.auth());
    // ui.start('#firebaseui-container', uiConfig);
  }
}
</script>
