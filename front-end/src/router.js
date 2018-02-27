import vueRouter from 'vue-router'
import Animal from './components/Animal.vue'
import Breeding from './components/Breeding.vue'
import BreedingEvent from './components/BreedingEvent.vue'
import Calving from './components/Calving'
import CalvingRecord from './components/CalvingRecord'
import Cows from './components/Cows'
import Health from './components/Health'
import HealthEvent from './components/HealthEvent'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Outcomes from './components/Outcomes.vue'
import OutcomesRecords from './components/OutcomesRecords.vue'
import Pastures from './components/Pastures.vue'
import PastureEdit from './components/PastureEdit.vue'
import PastureMovements from './components/PastureMovements.vue'
import PastureMovementRecord from './components/PastureMovementRecord.vue'
import PregCheck from './components/PregCheck.vue'
import PregCheckEvent from './components/PregCheckEvent.vue'



const router = new vueRouter({
  mode: 'history',
  routes: [{
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Home
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
    },
    {
      path: '/movements',
      component: PastureMovements
    },
    {
      path: '/movements/:id',
      component: PastureMovementRecord
    }
  ]
})

export default router;