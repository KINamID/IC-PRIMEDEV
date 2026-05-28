import { createRouter, createWebHistory } from 'vue-router'
import MainContent from '../views/MainContent.vue'
import EvolutionTab from '../components/EvolutionTab.vue'
import StatsTab from '../components/StatsTab.vue'
import CommunityTab from '../components/CommunityTab.vue'

const routes = [
  {
    path: '/',
    component: MainContent,
    children: [
      {
        path: '',
        redirect: '/evolution',
      },
      {
        path: 'evolution',
        name: 'Evolution',
        component: EvolutionTab,
      },
      {
        path: 'stats',
        name: 'Stats',
        component: StatsTab,
      },
      {
        path: 'community',
        name: 'Community',
        component: CommunityTab,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
