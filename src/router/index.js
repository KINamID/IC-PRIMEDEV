import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DigimonView from '@/views/DigimonView.vue'
import EvolutionView from '@/views/EvolutionView.vue'
import CommunityView from '@/views/CommunityView.vue'
import MoveView from '@/views/MoveView.vue'

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
    path: '/Moves',
    component: MoveView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
