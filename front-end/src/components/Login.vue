<template>
<div id="firebaseui-container"></div>
</template>

<script>
import firebase from 'firebase'
import firebaseui from 'firebaseui'
import {
  config
} from '../utils/firebaseConfig.js'

export default {
  name: 'login',
  mounted() {
    let uiConfig = {
      signInSuccessUrl: '/cattle',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    };
    let ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-container', uiConfig);
  }
}
</script>
