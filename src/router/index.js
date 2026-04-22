import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TicketDetailView from '../views/TicketDetailView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import OrderCompleteView from '../views/OrderCompleteView.vue'
import MyPageView from '../views/MyPageView.vue'
import LoginView from '../views/LoginView.vue'
import DisclaimerView from '../views/DisclaimerView.vue'
import { store } from '../store/index.js'

const routes = [
  { path: '/', component: HomeView },
  { path: '/ticket/:id', component: TicketDetailView },
  { path: '/checkout/:id', component: CheckoutView, meta: { requiresAuth: true } },
  { path: '/order-complete/:orderId', component: OrderCompleteView, meta: { requiresAuth: true } },
  { path: '/my-page', component: MyPageView, meta: { requiresAuth: true } },
  { path: '/login', component: LoginView },
  { path: '/disclaimer', component: DisclaimerView },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth && !store.user) {
    next({ path: '/login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
