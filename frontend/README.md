# uchi-meshi

このプロジェクトは、家庭料理を管理し、共有するためのものです。

## 機能

- **食事の記録**: ユーザーは写真やメモ付きで日々の食事を記録できます。
- **食事の共有**: ユーザーは他のユーザーと食事を共有できます。
- **食事の計画**: ユーザーは1週間の食事を計画できます。

## 技術スタック

- [Next.js](https://nextjs.org/) - サーバーレンダリングアプリケーションを構築するためのReactフレームワーク。
- [TypeScript](https://www.typescriptlang.org/) - JavaScriptの静的型付けスーパーセット。
- [Material UI](https://mui.com/) - より速く、より簡単なWeb開発のためのReact UIフレームワーク。
- [Supabase](https://supabase.io/) - オープンソースのFirebase代替品。
- [React Hook Form](https://react-hook-form.com/) - 使いやすいバリデーションを備えた、パフォーマンスが高く、柔軟で拡張可能なフォーム。
- [Zod](https.zod.dev/) - 静的型推論を備えたTypeScriptファーストのスキーマバリデーション。

## ディレクトリ構成

```
.
├── src/
│   ├── app/         # Next.js App Router
│   ├── components/  # 共通コンポーネント
│   ├── features/    # 機能ベースのモジュール
│   ├── hooks/       # カスタムReactフック
│   ├── lib/         # ライブラリと外部サービス
│   ├── providers/   # React Contextプロバイダー
│   └── types/       # TypeScriptの型定義
...
```

## はじめに

### 前提条件

- [Node.js](https://nodejs.org/en/) (v18以降)
- [npm](https://www.npmjs.com/)

### インストール

1. **リポジトリをクローンする**

   ```bash
   git clone https://github.com/your-username/uchi-meshi.git
   cd uchi-meshi/frontend
   ```

2. **依存関係をインストールする**

   ```bash
   npm install
   ```

3. **環境変数を設定する**

   `frontend`ディレクトリに`.env.local`ファイルを作成し、Supabaseの認証情報を追加します。これらはSupabaseプロジェクトの設定で確認できます。

   ```.env.local
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

### 開発サーバーの実行

開発サーバーを起動するには、次のコマンドを実行します:

```bash
npm run dev
```

ブラウザで[http://localhost:3000](http://localhost:3000)を開いて結果を確認してください。

## リンティングとフォーマット

このプロジェクトでは、リンティングに[ESLint](https://eslint.org/)、コードのフォーマットに[Prettier](https://prettier.io/)を使用しています。リンターを実行するには、次のコマンドを使用します:

```bash
npm run lint
```
