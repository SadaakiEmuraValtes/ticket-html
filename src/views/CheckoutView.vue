<template>
  <div class="checkout-view">
    <button class="back-btn" @click="$router.back()">← 戻る</button>

    <div v-if="ticket">
      <h1 class="page-title">購入手続き</h1>

      <!-- 注文サマリー: iframeで表示 -->
      <section class="section">
        <h2>ご注文内容の確認</h2>
        <iframe
          :srcdoc="orderSrcdoc"
          class="order-frame"
          frameborder="0"
          scrolling="no"
          title="注文内容確認"
        />
      </section>

      <!-- 注意事項: iframeで表示 -->
      <iframe :srcdoc="cautionSrcdoc" class="caution-frame" frameborder="0" scrolling="no" title="注意事項" />

      <!-- 確認ボタン -->
      <div class="action-area" v-if="!done">
        <button class="confirm-btn" @click="handlePurchase" :disabled="loading">
          <span v-if="loading">⏳ 処理中...</span>
          <span v-else>✅ 購入を確定する</span>
        </button>
        <p class="note">※ デモサイトのため実際の決済は行われません</p>
      </div>
    </div>

    <div v-else class="not-found">チケットが見つかりませんでした</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { TICKETS } from '../data/tickets.js'
import { store } from '../store/index.js'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const done = ref(false)

const ticket = computed(() => TICKETS.find((t) => t.id === parseInt(route.params.id)))
const qty = computed(() => Math.max(1, parseInt(route.query.qty || 1)))

const orderSrcdoc = computed(() => {
  const t = ticket.value
  if (!t) return ''
  const total = t.price * qty.value
  return `<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Segoe UI','Hiragino Sans',Arial,sans-serif;background:#f8fafc;padding:0;}
table{width:100%;border-collapse:collapse;}
tr{border-bottom:1px solid #f1f5f9;}
td{padding:12px 18px;font-size:0.9rem;color:#1e293b;}
td:first-child{color:#64748b;width:35%;}
td:last-child{font-weight:600;}
.icon-cell{font-size:1.8rem;}
.total-row td{background:#eef2ff;font-size:1rem;}
.total-row td:last-child{font-size:1.4rem;font-weight:800;color:#4f46e5;}
</style></head><body>
<table>
  <tr><td>イベント</td><td>${t.icon} ${t.titleJa}</td></tr>
  <tr><td>開催日時</td><td>${t.date} ${t.time}</td></tr>
  <tr><td>会場</td><td>${t.venue}</td></tr>
  <tr><td>チケット単価</td><td>¥${t.price.toLocaleString()}</td></tr>
  <tr><td>枚数</td><td>${qty.value}枚</td></tr>
  <tr class="total-row"><td>合計金額</td><td>¥${total.toLocaleString()}</td></tr>
</table>
</body></html>`
})

const cautionSrcdoc = `<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Segoe UI',Arial,sans-serif;padding:12px 18px;background:#fff7ed;border-radius:8px;}
ul{list-style:none;display:flex;flex-direction:column;gap:6px;}
li{font-size:0.82rem;color:#92400e;display:flex;align-items:flex-start;gap:6px;}
li::before{content:'•';color:#f59e0b;font-weight:700;flex-shrink:0;}
</style></head><body>
<ul>
  <li>これは自動化テスト練習用のデモサイトです。実際の決済・購入は行われません。</li>
  <li>ご入力いただいた情報はセッションにのみ保存され、外部に送信されることはありません。</li>
  <li>チケットのキャンセルはマイページから行えます（デモ用）。</li>
</ul>
</body></html>`

async function handlePurchase() {
  if (!ticket.value || loading.value) return
  loading.value = true
  await new Promise((r) => setTimeout(r, 1200))
  const orderId = store.placeOrder(ticket.value, qty.value)
  done.value = true
  loading.value = false
  router.push('/order-complete/' + orderId)
}
</script>

<style scoped>
.checkout-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 680px;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  background: none;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 7px 14px;
  font-size: 0.875rem;
  color: #475569;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.15s;
  width: fit-content;
}
.back-btn:hover {
  background: white;
  border-color: #4f46e5;
  color: #4f46e5;
}

.page-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #1e293b;
}

.section {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
}
.section h2 {
  font-size: 0.95rem;
  font-weight: 600;
  color: #475569;
  padding: 14px 18px;
  border-bottom: 1px solid #f1f5f9;
  background: #f8fafc;
}

.order-frame {
  width: 100%;
  height: 220px;
  border: none;
  display: block;
}

.caution-frame {
  width: 100%;
  height: 90px;
  border: none;
  border-radius: 8px;
  display: block;
}

.action-area {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
}
.confirm-btn {
  padding: 14px 32px;
  background: #16a34a;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s;
}
.confirm-btn:hover:not(:disabled) {
  background: #15803d;
}
.confirm-btn:disabled {
  opacity: 0.7;
  cursor: default;
}
.note {
  font-size: 0.8rem;
  color: #94a3b8;
}

.not-found {
  text-align: center;
  padding: 48px;
  color: #94a3b8;
}
</style>
