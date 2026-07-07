# zipcode-search-app

郵便番号から住所を検索できるWebアプリです。

## 使用技術

- Next.js
- React
- TypeScript
- SCSS
- zipcloud API

## 機能

- 郵便番号検索
- 入力バリデーション
- エラーメッセージ表示
- ローディング表示
- 検索履歴表示
- 検索履歴の削除
- LocalStorageによる履歴保持
- Enterキーで検索
- 複数検索結果対応

## セットアップ

```bash
git clone https://github.com/senri-1004/zipcode-search-app.git
cd zipcode-search-app
npm install
npm run dev
```

ブラウザで以下にアクセスしてください。

```text
http://localhost:3000
```

## API

zipcloud 郵便番号検索API

https://zipcloud.ibsnet.co.jp/doc/api