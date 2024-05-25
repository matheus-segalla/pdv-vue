import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ClientesView from '../views/ClientesView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/pedidos',
    name: 'PedidosView',
    component: () => import(/* webpackChunkName: "about" */ '../views/PedidosView.vue')
  },
  {
    path: '/clientes',
    name: 'ClientesView',
    component: ClientesView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
