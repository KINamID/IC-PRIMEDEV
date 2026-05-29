import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DigimonView from '@/views/DigimonView.vue'
import EvolutionView from '@/views/EvolutionView.vue'
import CommunityView from '@/views/CommunityView.vue'
import StatsView from '@/views/StatsView.vue'

const routes = [
  {
    path: '/',
    component: HomeView,
  },
  {
    path: '/AllDigimon',
    component: DigimonView,
  },
  {
    path: '/Evolution',
    component: EvolutionView,
  },
  {
    path: '/Community',
    component: CommunityView,
  },
  {
    path: '/Stats/:id?',
    component: StatsView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
