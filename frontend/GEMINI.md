## 原則

- このファイルに記載されたプログラミング言語やフレームワーク、設計思想については必ず守ること

### 技術選定

- TypeScript, Rext, Next.js を使用すること
- UI ライブラリとしては Material UI を使用すること
- その他には以下のものを使用してよい
  - Supabase
  - React Hook Form
  - Zod

### 設計思想

- コンポーネントとロジックの責任を明確にするために Container/Presentational パターンを使用すること
- bulletproof のパターンについても意識をして可能な限り従うこと
- カスタムフックについては別ファイルとして切り出して、コンポーネントから import して使用すること
- import は絶対パスで行うこと
