<template>
  <div class="complete-view">
    <div v-if="order">
      <!-- 完了バナー: iframeで表示 -->
      <iframe :srcdoc="bannerSrcdoc" class="banner-frame" frameborder="0" scrolling="no" title="完了バナー" />

      <!-- 注文詳細: iframeで表示 -->
      <section class="detail-section">
        <h2>注文詳細</h2>
        <iframe
          :srcdoc="detailSrcdoc"
          class="detail-frame"
          frameborder="0"
          scrolling="no"
          title="注文詳細"
        />
      </section>

      <!-- アクション -->
      <div class="actions">
        <button class="btn-mypage" @click="$router.push('/my-page')">📋 マイページで確認する</button>
        <button class="btn-home" @click="$router.push('/')">🎫 チケット一覧に戻る</button>
      </div>
    </div>
    <div v-else class="not-found">注文情報が見つかりませんでした</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { store } from '../store/index.js'

const route = useRoute()
const order = computed(() => store.orders.find((o) => o.id === route.params.orderId))

const bannerSrcdoc = `<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{background:linear-gradient(135deg,#16a34a,#15803d);font-family:'Segoe UI',Arial,sans-serif;padding:28px 32px;display:flex;align-items:center;gap:20px;}
.icon{font-size:3rem;flex-shrink:0;}
.text h2{color:white;font-size:1.4rem;font-weight:800;margin-bottom:6px;}
.text p{color:rgba(255,255,255,0.88);font-size:0.92rem;}
</style></head><body>
<div class="icon">✅</div>
<div class="text"><h2>購入が完了しました！</h2><p>ご購入ありがとうございます。マイページから購入履歴をご確認いただけます。</p></div>
</body></html>`

const detailSrcdoc = computed(() => {
  const o = order.value
  if (!o) return ''
  const date = new Date(o.purchasedAt)
  const pd = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
  return `<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Segoe UI','Hiragino Sans',Arial,sans-serif;background:#f8fafc;padding:0;}
table{width:100%;border-collapse:collapse;}
tr{border-bottom:1px solid #f1f5f9;}
td{padding:12px 18px;font-size:0.9rem;color:#1e293b;}
td:first-child{color:#64748b;width:36%;}
td:last-child{font-weight:600;}
.id-cell{font-family:monospace;font-size:0.85rem;color:#4f46e5;letter-spacing:.04em;}
.total-row td{background:#f0fdf4;}
.total-row td:last-child{font-size:1.3rem;font-weight:800;color:#16a34a;}
</style></head><body>
<table>
  <tr><td>注文番号</td><td class="id-cell">${o.id}</td></tr>
  <tr><td>購入日時</td><td>${pd}</td></tr>
  <tr><td>イベント</td><td>${o.ticketIcon} ${o.ticketTitle}</td></tr>
  <tr><td>開催日時</td><td>${o.date} ${o.time}</td></tr>
  <tr><td>会場</td><td>${o.venue}</td></tr>
  <tr><td>枚数</td><td>${o.quantity}枚</td></tr>
  <tr class="total-row"><td>合計金額</td><td>¥${o.total.toLocaleString()}</td></tr>
</table>
</body></html>`
})
</script>

<style scoped>
.complete-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 680px;
}

.banner-frame {
  width: 100%;
  height: 110px;
  border: none;
  border-radius: 12px;
  display: block;
  overflow: hidden;
}

.detail-section {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
}
.detail-section h2 {
  font-size: 0.95rem;
  font-weight: 600;
  color: #475569;
  padding: 14px 18px;
  border-bottom: 1px solid #f1f5f9;
  background: #f8fafc;
}

.detail-frame {
  width: 100%;
  height: 252px;
  border: none;
  display: block;
}

.actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.btn-mypage,
.btn-home {
  padding: 12px 22px;
  border-radius: 10px;
  border: none;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.15s;
}
.btn-mypage {
  background: #4f46e5;
  color: white;
}
.btn-mypage:hover {
  background: #3730a3;
}
.btn-home {
  background: white;
  color: #4f46e5;
  border: 1px solid #4f46e5;
}
.btn-home:hover {
  background: #eef2ff;
}

.not-found {
  text-align: center;
  padding: 48px;
  color: #94a3b8;
}
</style>
