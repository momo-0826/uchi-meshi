## GitHub Actionsの基本的な仕組み

GitHub Actionsは、GitHubが提供するCI/CD (継続的インテグレーション/継続的デリバリー) プラットフォームだ。リポジトリ内のイベント（コードのプッシュ、プルリクエストの作成など）をトリガーとして、自動的にコードのビルド、テスト、デプロイなどのタスクを実行できる。

`main.yml` のようなYAMLファイルは、このGitHub Actionsに「何を、いつ、どのように実行するか」を指示するための設定ファイルだ。

### `main.yml` の構造と各要素の解説

以下は、一般的なGitHub Actionsのワークフローファイル (`main.yml`) の構造と、各要素の解説だ。

```yaml
name: CI # ワークフローの名前

on: # ワークフローが実行されるトリガー
  push:
    branches:
      - master # masterブランチへのプッシュ時に実行
  pull_request:
    branches:
      - master # masterブランチへのプルリクエスト時に実行

jobs: # 実行されるジョブの定義
  build-and-lint: # ジョブの名前
    runs-on: ubuntu-latest # ジョブが実行される環境（ランナー）
    env: # ジョブ全体で利用可能な環境変数
      NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
      NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}

    steps: # ジョブ内で実行される一連のステップ
      - name: Checkout code # ステップの名前
        uses: actions/checkout@v4 # 実行するアクション（再利用可能なコード）

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Install dependencies
        run: npm ci # 実行するシェルコマンド
        working-directory: frontend # コマンドを実行するディレクトリ

      - name: Run ESLint
        run: npm run lint
        working-directory: frontend

      - name: Run TypeScript check and Build
        run: npm run build
        working-directory: frontend
```

#### 1. `name: CI`

*   **ワークフローの名前**。GitHub ActionsのUI（リポジトリの「Actions」タブ）で、この名前でワークフローが表示される。

#### 2. `on:`

*   このワークフローが**いつ実行されるか**を定義する**トリガー**。
*   `push`: 指定したブランチへのコードのプッシュがあった場合に実行される。
*   `pull_request`: 指定したブランチへのプルリクエストが作成されたり、更新されたりした場合に実行される。
*   `branches: - master`: `master` ブランチが対象であることを示している。つまり、`master` へのプッシュ、または `master` へのプルリクエストがトリガーとなる。

#### 3. `jobs:`

*   ワークフローは一つ以上の**ジョブ**で構成される。ジョブは、特定の目的を持つ一連のステップの集まりだ。
*   `build-and-lint`: これはジョブの名前。複数のジョブを定義することもできる（例: `build-and-lint` ジョブの後に `deploy` ジョブを実行するなど）。

#### 4. `runs-on: ubuntu-latest`

*   ジョブが実行される**ランナー（Runner）**を指定する。ランナーは、GitHubが提供する仮想マシン（VM）だ。
*   `ubuntu-latest`: 最新のUbuntu Linux環境でジョブを実行することを意味する。WindowsやmacOSのランナーも選択できる。

#### 5. `env:`

*   その**ジョブ全体で利用可能な環境変数**を定義する。
*   `NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}`:
    *   `NEXT_PUBLIC_SUPABASE_URL` という名前の環境変数を設定している。
    *   `secrets.NEXT_PUBLIC_SUPABASE_URL`: これは、GitHubリポジトリの「Settings」→「Secrets」に保存されているシークレットの値を参照している。これにより、機密情報をコードに直接書き込むことなく、安全に環境変数として利用できる。

#### 6. `steps:`

*   ジョブ内で実行される**個々のタスク**のリストだ。ステップは上から順に実行される。
*   各ステップには `name` を付けて、何をしているのか分かりやすくすることができる。

#### 7. `uses: actions/checkout@v4`

*   これは、GitHub Actionsが提供する**アクション（Action）**を使用していることを示している。アクションは、特定のタスクを実行するために事前にパッケージ化された再利用可能なコードだ。
*   `actions/checkout@v4`: リポジトリのコードをランナーにチェックアウト（クローン）するための公式アクションだ。これがないと、ランナーはリポジトリのファイルにアクセスできない。

#### 8. `uses: actions/setup-node@v4`

*   Node.js環境をセットアップするための公式アクションだ。
*   `with: node-version: "20"`: このアクションに渡す引数で、Node.jsのバージョンを `20` に指定している。

#### 9. `run: npm ci`

*   これは、ランナー上で**シェルコマンド**を実行するための指示だ。
*   `npm ci`: 依存関係をクリーンにインストールするためのコマンド。CI環境で推奨される。

#### 10. `working-directory: frontend`

*   `run` コマンドや `uses` アクションが実行される**ディレクトリ**を指定する。
*   デフォルトでは、ジョブはリポジトリのルートディレクトリで実行される。しかし、プロジェクトでは `package.json` やソースコードが `frontend` ディレクトリ内にあるため、この設定が必要だった。これにより、`npm ci` や `npm run lint` などのコマンドが `frontend` ディレクトリ内で実行されるようになる。

### CIワークフローがやっていること

この `main.yml` は、コードがGitHubにプッシュされたり、プルリクエストが作成されたりするたびに、以下のことを自動的に実行する。

1.  **コードのチェックアウト**: リポジトリのコードをGitHub Actionsの仮想マシンにコピーする。
2.  **Node.jsのセットアップ**: Node.jsのバージョン20をインストールする。
3.  **依存関係のインストール**: `frontend` ディレクトリに移動し、`package-lock.json` に基づいてプロジェクトの依存関係をインストールする。
4.  **リンティングの実行**: `frontend` ディレクトリで `npm run lint` コマンドを実行し、コードのスタイルや潜在的なエラーをチェックする。
5.  **型チェックとビルドの実行**: `frontend` ディレクトリで `npm run build` コマンドを実行し、TypeScriptの型エラーがないか確認し、本番用のビルドが可能か検証する。

これらのステップがすべて成功すれば、CIは「パス」となり、コードが品質基準を満たしていることを示す。もし途中でエラーが発生すれば、CIは「失敗」となり、問題があることを教えてくれる。
