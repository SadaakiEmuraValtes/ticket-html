import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import { store } from './store/index.js'

const app = createApp(App)
app.use(router)
app.mount('#app')

// Expose to header/footer iframes (same-origin)
window.ticketStore = store
window.ticketCancelOrder = (orderId) => store.cancelOrder(orderId)
