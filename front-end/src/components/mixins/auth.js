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
        if (!user) {
          this.$router.push('/login');
        }
      })
    }
  }
}

export { authorization }