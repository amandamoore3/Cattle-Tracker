'use strict'
import firebase from 'firebase';
import vueRouter from 'vue-router'

const authorization = {
  created: function() {
    this.auth()
  },
  methods: {
    auth() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log('Access granted.');
        } else {
          this.$router.push('/login');
          console.log('you got denied');
        }
      })
    },
    hello: function() {
      console.log('hello');
    }
  }
}

export { authorization }