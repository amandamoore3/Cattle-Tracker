import vueRouter from 'vue-router'
import Animal from './components/Animal.vue'
import Breeding from './components/Breeding.vue'
import BreedingEvent from './components/BreedingEvent.vue'
import Calving from './components/Calving'
import CalvingRecord from './components/CalvingRecord'
import Cows from './components/Cows'
import Health from './components/Health'
import HealthEvent from './components/HealthEvent'
import Login from './components/Login.vue'
import LoggedIn from './components/LoggedIn.vue'
import Outcomes from './components/Outcomes.vue'
import OutcomesRecords from './components/OutcomesRecords.vue'
import Pastures from './components/Pastures.vue'
import PastureEdit from './components/PastureEdit.vue'
import PregCheck from './components/PregCheck.vue'
import PregCheckEvent from './components/PregCheckEvent.vue'



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
      name: 'individual-animal',
      component: Animal
    },
    {
      path: '/breeding',
      component: Breeding
    },
    {
      path: '/breedingevent/:id',
      component: BreedingEvent
    },
    {
      path: '/calving',
      component: Calving
    },
    {
      path: '/calvingevent/:id',
      component: CalvingRecord
    },
    {
      path: '/pregnancy',
      component: PregCheck
    },
    {
      path: '/pregcheck/:id',
      component: PregCheckEvent
    },
    {
      path: '/health',
      component: Health
    },
    {
      path: '/healthevent/:id',
      component: HealthEvent
    },
    {
      path: '/outcomes',
      component: Outcomes
    },
    {
      path: '/outcomes/:id',
      component: OutcomesRecords
    },
    {
      path: '/pastures',
      component: Pastures
    },
    {
      path: '/pastures/:id',
      component: PastureEdit
    }
  ]
})

export default router;