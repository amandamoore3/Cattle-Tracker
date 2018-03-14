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
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/:user/breeding',
      name: 'breeding',
      component: Breeding
    },
    {
      path: '/:user/breedingevent/:id',
      name: 'breeding-event',
      component: BreedingEvent
    },
    {
      path: '/:user/calving',
      name: 'calving',
      component: Calving
    },
    {
      path: '/:user/calvingevent/:id',
      name: 'calving-record',
      component: CalvingRecord
    },
    {
      path: '/:user/cattle',
      name: 'cattle',
      component: Cows
    },
    {
      path: '/:user/health',
      name: 'health',
      component: Health
    },
    {
      path: '/:user/healthevent/:id',
      name: 'health-event',
      component: HealthEvent
    },
    {
      path: '/:user/cattle/:id',
      name: 'individual-animal',
      component: Animal
    },
    {
      path: '/:user/outcomes',
      name: 'outcomes',
      component: Outcomes
    },
    {
      path: '/:user/outcomes/:id',
      name: 'outcomes-records',
      component: OutcomesRecords
    },
    {
      path: '/:user/pastures',
      name: 'pastures',
      component: Pastures
    },
    {
      path: '/:user/pastures/:id',
      name: 'pasture-edit',
      component: PastureEdit
    },
    {
      path: '/:user/movements',
      name: 'pasture-movements',
      component: PastureMovements
    },
    {
      path: '/:user/movements/:id',
      name: 'pasture-movement-record',
      component: PastureMovementRecord
    },
    {
      path: '/:user/pregnancy',
      name: 'preg-check',
      component: PregCheck
    },
    {
      path: '/:user/pregcheck/:id',
      name: 'preg-check-event',
      component: PregCheckEvent
    }
  ]
})

export default router;