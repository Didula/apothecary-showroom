import Vue from 'vue'
import VueRouter from 'vue-router'
import PriceIndex from '../views/PriceIndex.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'PriceIndex',
    component: PriceIndex
  },
  {
    path: '/store',
    name: 'Store',
    component: () => import('../views/Store.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
