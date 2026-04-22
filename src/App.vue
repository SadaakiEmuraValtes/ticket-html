<template>
  <div class="app-shell">
    <!-- ヘッダーナビ: iframe で本文と分離 -->
    <div class="header-wrapper">
      <iframe
        :src="headerSrc"
        class="header-iframe"
        scrolling="no"
        frameborder="0"
        title="ナビゲーション"
      />
    </div>

    <!-- メインコンテンツ -->
    <main class="main-wrapper">
      <RouterView />
    </main>

    <!-- フッター: iframe で本文と分離 -->
    <div class="footer-wrapper">
      <iframe
        :src="footerSrc"
        class="footer-iframe"
        scrolling="no"
        frameborder="0"
        title="フッター"
      />
    </div>
  </div>
</template>

<script setup>
const headerSrc = import.meta.env.BASE_URL + 'header.html'
const footerSrc = import.meta.env.BASE_URL + 'footer.html'
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', 'Hiragino Sans', 'Meiryo', Arial, sans-serif;
  background: #f1f5f9;
  color: #1e293b;
}

.app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header-wrapper {
  width: 100%;
  height: 64px;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.header-iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

.main-wrapper {
  flex: 1;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  padding: 28px 16px;
}

.footer-wrapper {
  width: 100%;
  height: 80px;
  flex-shrink: 0;
}

.footer-iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}
</style>
