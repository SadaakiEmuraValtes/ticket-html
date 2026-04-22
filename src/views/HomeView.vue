<template>
  <div class="home">
    <!-- お知らせ: iframeで表示 -->
    <iframe :srcdoc="noticeSrcdoc" class="notice-frame" scrolling="no" frameborder="0" title="お知らせ" />

    <!-- ヒーロー -->
    <div class="hero">
      <div class="hero-inner">
        <h1>🎫 TicketMart</h1>
        <p>コンサート・スポーツ・演劇など人気チケットをかんたん購入</p>
      </div>
    </div>

    <!-- カテゴリフィルター -->
    <div class="section-header">
      <h2>チケット一覧</h2>
    </div>
    <div class="filter-bar">
      <button
        v-for="cat in CATEGORIES"
        :key="cat.id"
        class="cat-btn"
        :class="{ active: selectedCategory === cat.id }"
        @click="selectedCategory = cat.id"
      >
        {{ cat.label }}
      </button>
    </div>

    <!-- チケットグリッド -->
    <div class="ticket-grid" v-if="filteredTickets.length > 0">
      <div
        v-for="ticket in filteredTickets"
        :key="ticket.id"
        class="ticket-card"
        @click="$router.push('/ticket/' + ticket.id)"
      >
        <div class="card-top">
          <span class="ticket-icon">{{ ticket.icon }}</span>
          <span class="cat-badge">{{ getCategoryLabel(ticket.category) }}</span>
        </div>
        <h3 class="ticket-title">{{ ticket.titleJa }}</h3>
        <div class="ticket-meta">
          <span>📅 {{ ticket.date }} {{ ticket.time }}</span>
          <span>📍 {{ ticket.venue }}</span>
        </div>
        <div class="card-footer">
          <div class="price-info">
            <span class="price">¥{{ ticket.price.toLocaleString() }}</span>
            <span class="stock" :class="{ low: ticket.stock < 100 }">残り{{ ticket.stock }}枚</span>
          </div>
          <button class="buy-btn" @click.stop="$router.push('/ticket/' + ticket.id)">詳細・購入</button>
        </div>
      </div>
    </div>
    <div v-else class="empty">該当するチケットがありません</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { TICKETS, CATEGORIES } from '../data/tickets.js'

const selectedCategory = ref('all')

const noticeSrcdoc = `<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{background:#fef9c3;padding:11px 20px;font-family:'Segoe UI',Arial,sans-serif;height:46px;display:flex;align-items:center;}
p{font-size:0.85rem;color:#713f12;}
strong{color:#92400e;}
</style></head><body>
<p>⚠️ これは<strong>自動化テスト練習用のデモサイト</strong>です。実際の購入・決済は一切行われません。テスト目的でご利用ください。</p>
</body></html>`

const filteredTickets = computed(() => {
  if (selectedCategory.value === 'all') return TICKETS
  return TICKETS.filter((t) => t.category === selectedCategory.value)
})

function getCategoryLabel(catId) {
  return CATEGORIES.find((c) => c.id === catId)?.label || catId
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.notice-frame {
  width: 100%;
  height: 46px;
  border: none;
  border-radius: 8px;
  display: block;
}

.hero {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  border-radius: 14px;
  overflow: hidden;
}
.hero-inner {
  padding: 36px 32px;
  color: white;
  text-align: center;
}
.hero h1 {
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 10px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
.hero p {
  font-size: 1.05rem;
  opacity: 0.92;
}

.section-header h2 {
  font-size: 1.3rem;
  color: #1e293b;
  font-weight: 700;
}

.filter-bar {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.cat-btn {
  padding: 7px 18px;
  border: 1px solid #cbd5e1;
  border-radius: 20px;
  background: white;
  cursor: pointer;
  font-size: 0.875rem;
  color: #475569;
  transition: all 0.15s;
  font-family: inherit;
}
.cat-btn:hover {
  border-color: #4f46e5;
  color: #4f46e5;
}
.cat-btn.active {
  background: #4f46e5;
  color: white;
  border-color: #4f46e5;
  font-weight: 600;
}

.ticket-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}

.ticket-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.ticket-card:hover {
  border-color: #4f46e5;
  box-shadow: 0 6px 20px rgba(79, 70, 229, 0.14);
  transform: translateY(-3px);
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.ticket-icon {
  font-size: 2.2rem;
}
.cat-badge {
  font-size: 0.72rem;
  color: #4f46e5;
  background: #eef2ff;
  padding: 3px 10px;
  border-radius: 12px;
  font-weight: 600;
}

.ticket-title {
  font-size: 1rem;
  color: #1e293b;
  line-height: 1.45;
  font-weight: 600;
}

.ticket-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.8rem;
  color: #64748b;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 8px;
  border-top: 1px solid #f1f5f9;
}
.price-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.price {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1e293b;
}
.stock {
  font-size: 0.75rem;
  color: #64748b;
}
.stock.low {
  color: #dc2626;
  font-weight: 600;
}
.buy-btn {
  padding: 8px 18px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.85rem;
  cursor: pointer;
  font-family: inherit;
  font-weight: 600;
  transition: background 0.15s;
}
.buy-btn:hover {
  background: #3730a3;
}

.empty {
  text-align: center;
  padding: 48px;
  color: #94a3b8;
  font-size: 1rem;
}
</style>
