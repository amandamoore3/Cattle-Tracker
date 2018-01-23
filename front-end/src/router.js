import vueRouter from 'vue-router'
import Animal from './components/Animal.vue'
import Breeding from './components/Breeding.vue'
import Cows from './components/Cows'
import Health from './components/Health'
import Login from './components/Login.vue'
import LoggedIn from './components/LoggedIn.vue'
import Outcomes from './components/Outcomes.vue'
import Pastures from './components/Pastures.vue'
import PregCheck from './components/PregCheck.vue'


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
      path: '/cattle',
      component: Cows
    },
    {
      path: '/cattle/:id',
      component: Animal
    },
    {
      path: '/breeding',
      component: Breeding
    },
    {
      path: '/pregnancy',
      component: PregCheck
    },
    {
      path: '/health',
      component: Health
    },
    {
      path: '/outcomes',
      component: Outcomes
    },
    {
      path: '/pastures',
      component: Pastures
    }
  ]
})

export default router;