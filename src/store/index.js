import { reactive } from 'vue'
import { USERS } from '../data/users.js'

const SESSION_KEY = 'ticketmart_session'

function loadSession() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null')
  } catch {
    return null
  }
}

const saved = loadSession()

export const store = reactive({
  user: saved?.user || null,
  orders: saved?.orders || [],

  login(username, password) {
    const found = USERS.find(
      (u) => u.username === username && u.password === password
    )
    if (found) {
      this.user = {
        id: found.id,
        username: found.username,
        name: found.name,
        email: found.email,
      }
      this._save()
      return true
    }
    return false
  },

  logout() {
    this.user = null
    this._save()
  },

  placeOrder(ticket, quantity) {
    const now = new Date()
    const pad = (n) => String(n).padStart(2, '0')
    const ts =
      now.getFullYear().toString() +
      pad(now.getMonth() + 1) +
      pad(now.getDate()) +
      '-' +
      pad(now.getHours()) +
      pad(now.getMinutes()) +
      pad(now.getSeconds())
    const rand = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0')
    const orderId = `TK-${ts}-${rand}`

    const order = {
      id: orderId,
      ticketId: ticket.id,
      ticketTitle: ticket.titleJa,
      ticketIcon: ticket.icon,
      date: ticket.date,
      time: ticket.time,
      venue: ticket.venue,
      price: ticket.price,
      quantity,
      total: ticket.price * quantity,
      purchasedAt: now.toISOString(),
      status: 'confirmed',
    }
    this.orders.unshift(order)
    this._save()
    return orderId
  },

  cancelOrder(orderId) {
    const order = this.orders.find((o) => o.id === orderId)
    if (order && order.status === 'confirmed') {
      order.status = 'cancelled'
      this._save()
      return true
    }
    return false
  },

  _save() {
    sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ user: this.user, orders: this.orders })
    )
  },
})
