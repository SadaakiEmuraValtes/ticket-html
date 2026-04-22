<template>
  <div class="detail-view">
    <button class="back-btn" @click="$router.push('/')">← 一覧に戻る</button>

    <div v-if="ticket">
      <!-- チケットヘッダー -->
      <div class="ticket-header">
        <span class="header-icon">{{ ticket.icon }}</span>
        <div class="header-info">
          <span class="cat-badge">{{ getCategoryLabel(ticket.category) }}</span>
          <h1>{{ ticket.titleJa }}</h1>
        </div>
      </div>

      <!-- チケット詳細: iframeで表示 -->
      <div class="detail-frame-wrapper">
        <iframe
          :srcdoc="detailSrcdoc"
          class="detail-frame"
          frameborder="0"
          scrolling="no"
          title="チケット詳細情報"
        />
      </div>

      <!-- 購入セクション -->
      <div class="purchase-section" v-if="ticket.stock > 0">
        <h2>購入枚数を選択</h2>
        <div class="qty-row">
          <div class="qty-selector">
            <button class="qty-btn" @click="qty > 1 && qty--" :disabled="qty <= 1">−</button>
            <span class="qty-value">{{ qty }}</span>
            <button class="qty-btn" @click="qty < 10 && qty++" :disabled="qty >= 10">＋</button>
          </div>
          <div class="total-price">
            合計: <strong>¥{{ (ticket.price * qty).toLocaleString() }}</strong>
          </div>
        </div>

        <!-- 購入サマリー: iframeで表示 -->
        <iframe
          :srcdoc="purchaseSummarySrcdoc"
          class="purchase-summary-frame"
          frameborder="0"
          scrolling="no"
          title="購入サマリー"
        />

        <button class="checkout-btn" @click="goCheckout">
          購入手続きへ進む →
        </button>
      </div>

      <div v-else class="sold-out">
        <span>😢</span> このチケットは売り切れです
      </div>
    </div>

    <div v-else class="not-found">チケットが見つかりませんでした</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { TICKETS, CATEGORIES } from '../data/tickets.js'

const route = useRoute()
const router = useRouter()
const qty = ref(1)

const ticket = computed(() => TICKETS.find((t) => t.id === parseInt(route.params.id)))

function getCategoryLabel(catId) {
  return CATEGORIES.find((c) => c.id === catId)?.label || catId
}

const detailSrcdoc = computed(() => {
  const t = ticket.value
  if (!t) return ''
  return `<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Segoe UI','Hiragino Sans',Arial,sans-serif;padding:20px;background:#f8fafc;color:#1e293b;}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;}
.item{background:white;border:1px solid #e2e8f0;border-radius:8px;padding:14px;}
.label{font-size:0.72rem;color:#64748b;margin-bottom:5px;text-transform:uppercase;letter-spacing:.03em;}
.value{font-size:0.95rem;font-weight:600;color:#1e293b;}
.price-val{font-size:1.6rem;font-weight:800;color:#4f46e5;}
.desc{background:white;border:1px solid #e2e8f0;border-radius:8px;padding:16px;}
.desc-label{font-size:0.75rem;color:#64748b;margin-bottom:8px;font-weight:600;}
.desc-text{font-size:0.9rem;line-height:1.75;color:#374151;}
</style></head><body>
<div class="grid">
  <div class="item"><div class="label">📅 開催日時</div><div class="value">${t.date} ${t.time}</div></div>
  <div class="item"><div class="label">📍 会場</div><div class="value">${t.venue}</div></div>
  <div class="item"><div class="label">💴 チケット代金</div><div class="price-val">¥${t.price.toLocaleString()}</div></div>
  <div class="item"><div class="label">🎟️ 残席数</div><div class="value">${t.stock}枚</div></div>
</div>
<div class="desc"><div class="desc-label">📝 イベント詳細</div><div class="desc-text">${t.description}</div></div>
</body></html>`
})

const purchaseSummarySrcdoc = computed(() => {
  const t = ticket.value
  if (!t) return ''
  const total = t.price * qty.value
  return `<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Segoe UI',Arial,sans-serif;padding:14px 18px;background:#eef2ff;border-radius:8px;color:#1e293b;}
.row{display:flex;justify-content:space-between;align-items:center;padding:4px 0;}
.label{font-size:0.85rem;color:#4338ca;}
.value{font-size:0.9rem;font-weight:600;color:#1e293b;}
.divider{border:none;border-top:1px solid #c7d2fe;margin:8px 0;}
.total-row{display:flex;justify-content:space-between;align-items:center;}
.total-label{font-size:0.9rem;color:#3730a3;font-weight:600;}
.total-val{font-size:1.3rem;font-weight:800;color:#4f46e5;}
</style></head><body>
<div class="row"><span class="label">チケット単価</span><span class="value">¥${t.price.toLocaleString()}</span></div>
<div class="row"><span class="label">枚数</span><span class="value">${qty.value}枚</span></div>
<hr class="divider">
<div class="total-row"><span class="total-label">合計金額</span><span class="total-val">¥${total.toLocaleString()}</span></div>
</body></html>`
})

function goCheckout() {
  router.push({ path: `/checkout/${ticket.value.id}`, query: { qty: qty.value } })
}
</script>

<style scoped>
.detail-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
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

.ticket-header {
  display: flex;
  align-items: center;
  gap: 20px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 24px;
}
.header-icon {
  font-size: 3.5rem;
  flex-shrink: 0;
}
.header-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.cat-badge {
  font-size: 0.75rem;
  color: #4f46e5;
  background: #eef2ff;
  padding: 3px 10px;
  border-radius: 12px;
  font-weight: 600;
  width: fit-content;
}
.header-info h1 {
  font-size: 1.5rem;
  color: #1e293b;
  line-height: 1.4;
}

.detail-frame-wrapper {
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}
.detail-frame {
  width: 100%;
  height: 260px;
  display: block;
  border: none;
}

.purchase-section {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.purchase-section h2 {
  font-size: 1.1rem;
  color: #1e293b;
}

.qty-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}
.qty-selector {
  display: flex;
  align-items: center;
  gap: 0;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  overflow: hidden;
}
.qty-btn {
  width: 40px;
  height: 40px;
  background: #f8fafc;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #4f46e5;
  font-weight: 700;
  transition: background 0.15s;
  font-family: inherit;
}
.qty-btn:hover:not(:disabled) {
  background: #eef2ff;
}
.qty-btn:disabled {
  color: #cbd5e1;
  cursor: default;
}
.qty-value {
  width: 48px;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e293b;
  border-left: 1px solid #e2e8f0;
  border-right: 1px solid #e2e8f0;
  padding: 8px 0;
}
.total-price {
  font-size: 1rem;
  color: #475569;
}
.total-price strong {
  font-size: 1.3rem;
  color: #4f46e5;
}

.purchase-summary-frame {
  width: 100%;
  height: 110px;
  border: none;
  border-radius: 8px;
  display: block;
}

.checkout-btn {
  padding: 14px 28px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s;
  align-self: flex-start;
}
.checkout-btn:hover {
  background: #3730a3;
}

.sold-out {
  text-align: center;
  padding: 32px;
  background: #fff1f2;
  border: 1px solid #fecdd3;
  border-radius: 12px;
  color: #be123c;
  font-size: 1.1rem;
  font-weight: 600;
}

.not-found {
  text-align: center;
  padding: 48px;
  color: #94a3b8;
}
</style>
