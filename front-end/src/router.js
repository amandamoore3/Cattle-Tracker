import vueRouter from 'vue-router'
import Cows from './components/Cows'
import Login from './components/Login.vue'
import LoggedIn from './components/LoggedIn.vue'


const router = new vueRouter({
  mode: 'history',
  routes: [{
      path: '/',
      component: Login
    },
    {
      path: '/loggedin',
      component: LoggedIn
    },
    {
      path: '/cattle'
      component: Cows
    }
  ]
})

export default router;
