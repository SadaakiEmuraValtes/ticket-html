# 🎫 TicketMart

自動化テスト練習専用のチケット販売デモサイトです。

**デモURL:** https://sadaakiemuravaltes.github.io/ticket-html/

> ⚠️ 実際の購入・決済は行われません。テスト・自動化練習目的でご利用ください。

---

## 技術スタック

- **Vue 3** (Composition API `<script setup>`)
- **Vue Router 4** (`createWebHashHistory`)
- **Vite 5**
- **iframe** — ヘッダー・フッター・各コンテンツセクションで活用

---

## 機能一覧

| 機能 | 説明 |
|------|------|
| チケット一覧 | 8種類のチケット・カテゴリフィルター |
| チケット詳細 | イベント情報・枚数選択・購入サマリー |
| 購入手続き | 注文確認・購入確定 |
| 購入完了 | 注文番号発行・詳細表示 |
| マイページ | 購入履歴・チケットキャンセル |
| ログイン/ログアウト | セッション管理 |
| 免責事項 | 自動化練習サイトの免責明示 |

---

## テストアカウント

| ユーザー名 | パスワード | 氏名 |
|-----------|-----------|------|
| user1 | test1234 | 山田 太郎 |
| user2 | test1234 | 鈴木 花子 |
| user3 | test1234 | 田中 次郎 |

---

## iframe 構成

本サイトはページ上部のメニューと本文をiframeで分離しています。

| 場所 | iframe の役割 |
|------|--------------|
| ヘッダー全体 | `public/header.html` — ナビゲーション・ユーザー表示 |
| フッター全体 | `public/footer.html` — 免責注記 |
| ホーム | お知らせバナー |
| チケット詳細 | 開催情報・購入サマリー |
| 購入手続き | 注文内容・注意事項 |
| 購入完了 | 完了バナー・注文詳細 |
| マイページ | ユーザー情報・購入履歴 |
| ログイン | テストアカウント一覧 |
| 免責事項 | 免責本文 |

---

## ローカル起動

```bash
npm install
npm run dev
# → http://localhost:5173/ticket-html/
```

## ビルド & デプロイ

```bash
npm run build

DEPLOY_DIR=/c/Users/sadaaki.emura/AppData/Local/Temp/ticket-html-deploy
rm -rf $DEPLOY_DIR
git clone --branch gh-pages https://github.com/SadaakiEmuraValtes/ticket-html.git $DEPLOY_DIR
cp -r dist/. $DEPLOY_DIR/
cd $DEPLOY_DIR && git add -A && git commit -m "Deploy: ..." && git push origin gh-pages
```
