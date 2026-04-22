<template>
  <div class="disclaimer-view">
    <h1 class="page-title">免責事項</h1>
    <p class="subtitle">本サイトをご利用前に必ずお読みください</p>

    <!-- 免責事項本文: iframeで表示 -->
    <iframe
      :srcdoc="disclaimerSrcdoc"
      class="disclaimer-frame"
      frameborder="0"
      scrolling="yes"
      title="免責事項"
    />

    <div class="back-area">
      <button class="back-btn" @click="$router.push('/')">← トップページに戻る</button>
    </div>
  </div>
</template>

<script setup>
const disclaimerSrcdoc = `<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Segoe UI','Hiragino Sans','Meiryo',Arial,sans-serif;background:white;padding:28px 32px;color:#1e293b;line-height:1.8;}
h2{font-size:1rem;font-weight:700;color:#1e293b;margin-bottom:10px;margin-top:24px;padding-left:10px;border-left:4px solid #4f46e5;}
h2:first-child{margin-top:0;}
p{font-size:0.9rem;color:#374151;margin-bottom:8px;}
ul{margin:8px 0 8px 20px;}
li{font-size:0.9rem;color:#374151;margin-bottom:4px;}
.warn-box{background:#fef9c3;border:1px solid #fde68a;border-radius:8px;padding:14px 18px;margin:20px 0;}
.warn-box p{color:#92400e;font-weight:600;margin:0;}
.highlight{color:#4f46e5;font-weight:600;}
</style></head><body>

<div class="warn-box">
  <p>⚠️ このサイトは <span>自動化テスト・スクレイピングの練習専用デモサイト</span> です。実際のサービスではありません。</p>
</div>

<h2>1. サイトの目的</h2>
<p>本サイト「TicketMart」は、Playwright・Selenium・Robot Framework などのブラウザ自動化ツールおよびWebスクレイピング技術の学習・練習を目的として作成されたデモサイトです。</p>
<p>実際のチケット販売・購入・決済機能は一切提供しておりません。</p>

<h2>2. 取引・決済について</h2>
<ul>
  <li>本サイトでの「購入」操作は疑似的なものであり、実際の金銭授受・決済処理は行われません。</li>
  <li>表示されている価格・残席数・イベント情報はすべてデモ用のフィクションです。</li>
  <li>注文番号・購入履歴はブラウザのセッションストレージにのみ保存され、外部サーバーには送信されません。</li>
</ul>

<h2>3. 個人情報について</h2>
<ul>
  <li>本サイトのテストアカウント情報（ユーザー名・パスワード）は公開情報です。</li>
  <li>入力されたデータはセッションストレージにのみ保存され、外部に送信・保存されることはありません。</li>
  <li>ブラウザを閉じるとすべてのデータは消去されます。</li>
</ul>

<h2>4. 利用上の注意</h2>
<ul>
  <li>本サイトは練習・学習目的のみに使用してください。</li>
  <li>過度な負荷をかける行為（DoS攻撃等）はご遠慮ください。</li>
  <li>本サイトの内容は予告なく変更・削除される場合があります。</li>
</ul>

<h2>5. 免責</h2>
<p>本サイトの利用によって生じたいかなる損害についても、運営者は責任を負いません。自己の責任においてご利用ください。</p>

<p style="margin-top:24px;font-size:0.8rem;color:#94a3b8;">最終更新: 2026年4月</p>
</body></html>`
</script>

<style scoped>
.disclaimer-view {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 760px;
}

.page-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #1e293b;
}
.subtitle {
  font-size: 0.9rem;
  color: #64748b;
  margin-top: -8px;
}

.disclaimer-frame {
  width: 100%;
  height: 620px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  display: block;
  background: white;
}

.back-area {
  display: flex;
}
.back-btn {
  padding: 9px 18px;
  background: white;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #475569;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.15s;
}
.back-btn:hover {
  border-color: #4f46e5;
  color: #4f46e5;
}
</style>
