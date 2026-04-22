<template>
  <div class="login-view">
    <div class="login-card">
      <div class="card-header">
        <span class="logo-icon">🎫</span>
        <h1>ログイン</h1>
        <p>TicketMart アカウントにログイン</p>
      </div>

      <!-- テストアカウント一覧: iframeで表示 -->
      <div class="accounts-wrapper">
        <div class="accounts-label">テストアカウント一覧</div>
        <iframe
          :srcdoc="accountsSrcdoc"
          class="accounts-frame"
          frameborder="0"
          scrolling="no"
          title="テストアカウント一覧"
        />
      </div>

      <!-- ログインフォーム -->
      <form class="login-form" @submit.prevent="handleLogin">
        <div class="field">
          <label for="username">ユーザー名</label>
          <input
            id="username"
            v-model="username"
            type="text"
            placeholder="例: user1"
            autocomplete="username"
            required
          />
        </div>
        <div class="field">
          <label for="password">パスワード</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="test1234"
            autocomplete="current-password"
            required
          />
        </div>
        <div v-if="errorMsg" class="error-msg">{{ errorMsg }}</div>
        <button type="submit" class="login-btn" :disabled="loading">
          <span v-if="loading">ログイン中...</span>
          <span v-else>ログイン</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { USERS } from '../data/users.js'
import { store } from '../store/index.js'

const router = useRouter()
const route = useRoute()

const username = ref('')
const password = ref('')
const errorMsg = ref('')
const loading = ref(false)

const accountsSrcdoc = (() => {
  const rows = USERS.map(
    (u) =>
      `<tr><td>${u.username}</td><td class="pw">test1234</td><td>${u.name}</td><td class="email">${u.email}</td></tr>`
  ).join('')
  return `<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Segoe UI',Arial,sans-serif;background:#f8fafc;}
table{width:100%;border-collapse:collapse;font-size:0.83rem;}
thead tr{background:#eef2ff;border-bottom:2px solid #c7d2fe;}
thead th{padding:9px 14px;text-align:left;font-weight:600;color:#4338ca;}
tbody tr{border-bottom:1px solid #f1f5f9;}
tbody tr:last-child{border-bottom:none;}
td{padding:9px 14px;color:#1e293b;}
.pw{font-family:monospace;color:#16a34a;font-weight:600;}
.email{color:#64748b;font-size:0.78rem;}
</style></head><body>
<table>
  <thead><tr><th>ユーザー名</th><th>パスワード</th><th>氏名</th><th>メールアドレス</th></tr></thead>
  <tbody>${rows}</tbody>
</table>
</body></html>`
})()

async function handleLogin() {
  if (loading.value) return
  errorMsg.value = ''
  loading.value = true
  await new Promise((r) => setTimeout(r, 600))
  const ok = store.login(username.value, password.value)
  loading.value = false
  if (ok) {
    const redirect = route.query.redirect
    router.push(redirect && redirect !== '/login' ? redirect : '/')
  } else {
    errorMsg.value = 'ユーザー名またはパスワードが正しくありません'
  }
}
</script>

<style scoped>
.login-view {
  display: flex;
  justify-content: center;
  padding: 20px 0;
}

.login-card {
  width: 100%;
  max-width: 520px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  overflow: hidden;
}

.card-header {
  padding: 28px 32px 20px;
  text-align: center;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
}
.logo-icon {
  font-size: 2.4rem;
  display: block;
  margin-bottom: 8px;
}
.card-header h1 {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 4px;
}
.card-header p {
  font-size: 0.875rem;
  opacity: 0.88;
}

.accounts-wrapper {
  margin: 20px 24px 0;
  border: 1px solid #e0e7ff;
  border-radius: 10px;
  overflow: hidden;
}
.accounts-label {
  background: #eef2ff;
  padding: 8px 14px;
  font-size: 0.78rem;
  font-weight: 700;
  color: #4338ca;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}
.accounts-frame {
  width: 100%;
  height: 118px;
  border: none;
  display: block;
}

.login-form {
  padding: 20px 24px 28px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.field label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #374151;
}
.field input {
  padding: 10px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.95rem;
  font-family: inherit;
  color: #1e293b;
  outline: none;
  transition: border-color 0.15s;
}
.field input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.error-msg {
  padding: 10px 14px;
  background: #fff1f2;
  border: 1px solid #fecdd3;
  border-radius: 8px;
  font-size: 0.85rem;
  color: #be123c;
}

.login-btn {
  padding: 12px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s;
  margin-top: 4px;
}
.login-btn:hover:not(:disabled) {
  background: #3730a3;
}
.login-btn:disabled {
  opacity: 0.7;
  cursor: default;
}
</style>
