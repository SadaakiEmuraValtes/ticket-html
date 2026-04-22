<template>
  <div class="mypage">
    <h1 class="page-title">マイページ</h1>

    <!-- ユーザー情報: iframeで表示 -->
    <iframe :srcdoc="userInfoSrcdoc" class="userinfo-frame" frameborder="0" scrolling="no" title="ユーザー情報" />

    <!-- 購入履歴 -->
    <section class="orders-section">
      <div class="section-header">
        <h2>購入履歴</h2>
        <span class="count-badge">{{ confirmedCount }}件確定 / {{ cancelledCount }}件キャンセル</span>
      </div>

      <div v-if="store.orders.length === 0" class="empty-orders">
        <p>購入履歴がありません</p>
        <button class="btn-shop" @click="$router.push('/')">チケットを探す →</button>
      </div>

      <!-- 購入履歴リスト: iframeで表示 -->
      <iframe
        v-else
        :srcdoc="ordersSrcdoc"
        class="orders-frame"
        frameborder="0"
        scrolling="yes"
        title="購入履歴"
      />
    </section>

    <!-- ログアウト -->
    <div class="logout-area">
      <button class="logout-btn" @click="handleLogout">ログアウト</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store/index.js'

const router = useRouter()

const confirmedCount = computed(() => store.orders.filter((o) => o.status === 'confirmed').length)
const cancelledCount = computed(() => store.orders.filter((o) => o.status === 'cancelled').length)

const userInfoSrcdoc = computed(() => {
  const u = store.user
  if (!u) return ''
  return `<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Segoe UI','Hiragino Sans',Arial,sans-serif;padding:20px 24px;background:linear-gradient(135deg,#eef2ff,#f0f9ff);display:flex;align-items:center;gap:20px;}
.avatar{width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#4f46e5,#7c3aed);display:flex;align-items:center;justify-content:center;font-size:1.5rem;font-weight:800;color:white;flex-shrink:0;}
.info h3{font-size:1.1rem;font-weight:700;color:#1e293b;margin-bottom:4px;}
.info p{font-size:0.82rem;color:#64748b;margin-bottom:2px;}
</style></head><body>
<div class="avatar">${u.name[0]}</div>
<div class="info">
  <h3>${u.name}</h3>
  <p>📧 ${u.email}</p>
  <p>🔑 @${u.username}</p>
</div>
</body></html>`
})

const ordersSrcdoc = computed(() => {
  const rows = store.orders
    .map((o) => {
      const pd = new Date(o.purchasedAt)
      const dateStr = `${pd.getFullYear()}/${String(pd.getMonth() + 1).padStart(2, '0')}/${String(pd.getDate()).padStart(2, '0')}`
      const isCancelled = o.status === 'cancelled'
      const cancelBtn = isCancelled
        ? `<span class="status-cancelled">キャンセル済</span>`
        : `<button class="cancel-btn" onclick="window.parent.ticketCancelOrder('${o.id}')">キャンセル</button>`
      const rowClass = isCancelled ? 'row-cancelled' : ''
      return `<tr class="${rowClass}">
        <td class="id-cell">${o.id}</td>
        <td>${o.ticketIcon} ${o.ticketTitle}</td>
        <td>${o.date}</td>
        <td>${o.quantity}枚</td>
        <td class="price-cell">¥${o.total.toLocaleString()}</td>
        <td class="date-cell">${dateStr}</td>
        <td>${cancelBtn}</td>
      </tr>`
    })
    .join('')

  return `<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Segoe UI','Hiragino Sans',Arial,sans-serif;background:white;}
table{width:100%;border-collapse:collapse;font-size:0.82rem;}
thead tr{background:#f8fafc;border-bottom:2px solid #e2e8f0;}
thead th{padding:11px 12px;text-align:left;font-weight:600;color:#475569;white-space:nowrap;}
tbody tr{border-bottom:1px solid #f1f5f9;}
tbody tr:hover:not(.row-cancelled){background:#fafbff;}
td{padding:11px 12px;color:#1e293b;vertical-align:middle;}
.id-cell{font-family:monospace;font-size:0.75rem;color:#6366f1;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.price-cell{font-weight:700;color:#1e293b;}
.date-cell{color:#64748b;white-space:nowrap;}
.row-cancelled td{color:#94a3b8;}
.row-cancelled td:not(.id-cell){text-decoration:line-through;}
.cancel-btn{padding:5px 12px;background:#fff1f2;border:1px solid #fecdd3;color:#be123c;border-radius:6px;font-size:0.78rem;cursor:pointer;font-weight:600;white-space:nowrap;}
.cancel-btn:hover{background:#ffe4e6;}
.status-cancelled{font-size:0.78rem;color:#94a3b8;font-weight:600;}
</style></head><body>
<table>
  <thead><tr>
    <th>注文番号</th><th>イベント</th><th>開催日</th><th>枚数</th><th>金額</th><th>購入日</th><th>操作</th>
  </tr></thead>
  <tbody>${rows}</tbody>
</table>
</body></html>`
})

function handleLogout() {
  store.logout()
  router.push('/')
}
</script>

<style scoped>
.mypage {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.page-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #1e293b;
}

.userinfo-frame {
  width: 100%;
  height: 98px;
  border: none;
  border-radius: 12px;
  display: block;
  border: 1px solid #e0e7ff;
  overflow: hidden;
}

.orders-section {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  border-bottom: 1px solid #f1f5f9;
  background: #f8fafc;
}
.section-header h2 {
  font-size: 1rem;
  font-weight: 700;
  color: #1e293b;
}
.count-badge {
  font-size: 0.78rem;
  color: #64748b;
  background: #f1f5f9;
  padding: 3px 10px;
  border-radius: 12px;
}

.empty-orders {
  padding: 40px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  color: #94a3b8;
}
.btn-shop {
  padding: 10px 20px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
}

.orders-frame {
  width: 100%;
  height: 380px;
  border: none;
  display: block;
}

.logout-area {
  display: flex;
  justify-content: flex-end;
}
.logout-btn {
  padding: 9px 20px;
  background: white;
  color: #dc2626;
  border: 1px solid #fecaca;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.15s;
}
.logout-btn:hover {
  background: #fff1f2;
  border-color: #f87171;
}
</style>
