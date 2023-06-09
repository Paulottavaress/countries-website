import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CountryView  from '@/views/CountryView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/countries/:countryName',
    name: 'country',
    component: CountryView,
    props: true
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(_, __, savedPosition) {
    return savedPosition
      ? savedPosition
      : { left: 0, top: 0};
  }
})

export default router
