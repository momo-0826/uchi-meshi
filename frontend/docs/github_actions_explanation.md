## GitHub Actions の基本的な仕組み

GitHub Actions は、GitHub が提供する CI/CD (継続的インテグレーション/継続的デリバリー) プラットフォームだ。リポジトリ内のイベント（コードのプッシュ、プルリクエストの作成など）をトリガーとして、自動的にコードのビルド、テスト、デプロイなどのタスクを実行できる。

`main.yml` のような YAML ファイルは、この GitHub Actions に「何を、いつ、どのように実行するか」を指示するための設定ファイルだ。

### `main.yml` の構造と各要素の解説

以下は、一般的な GitHub Actions のワークフローファイル (`main.yml`) の構造と、各要素の解説だ。

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

- **ワークフローの名前**。GitHub Actions の UI（リポジトリの「Actions」タブ）で、この名前でワークフローが表示される。

#### 2. `on:`

- このワークフローが**いつ実行されるか**を定義する**トリガー**。
- `push`: 指定したブランチへのコードのプッシュがあった場合に実行される。
- `pull_request`: 指定したブランチへのプルリクエストが作成されたり、更新されたりした場合に実行される。
- `branches: - master`: `master` ブランチが対象であることを示している。つまり、`master` へのプッシュ、または `master` へのプルリクエストがトリガーとなる。

#### 3. `jobs:`

- ワークフローは一つ以上の**ジョブ**で構成される。ジョブは、特定の目的を持つ一連のステップの集まりだ。
- `build-and-lint`: これはジョブの名前。複数のジョブを定義することもできる（例: `build-and-lint` ジョブの後に `deploy` ジョブを実行するなど）。

#### 4. `runs-on: ubuntu-latest`

- ジョブが実行される**ランナー（Runner）**を指定する。ランナーは、GitHub が提供する仮想マシン（VM）だ。
- `ubuntu-latest`: 最新の Ubuntu Linux 環境でジョブを実行することを意味する。Windows や macOS のランナーも選択できる。

#### 5. `env:`

- その**ジョブ全体で利用可能な環境変数**を定義する。
- `NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}`:
  - `NEXT_PUBLIC_SUPABASE_URL` という名前の環境変数を設定している。
  - `secrets.NEXT_PUBLIC_SUPABASE_URL`: これは、GitHub リポジトリの「Settings」→「Secrets」に保存されているシークレットの値を参照している。これにより、機密情報をコードに直接書き込むことなく、安全に環境変数として利用できる。

#### 6. `steps:`

- ジョブ内で実行される**個々のタスク**のリストだ。ステップは上から順に実行される。
- 各ステップには `name` を付けて、何をしているのか分かりやすくすることができる。

#### 7. `uses: actions/checkout@v4`

- これは、GitHub Actions が提供する**アクション（Action）**を使用していることを示している。アクションは、特定のタスクを実行するために事前にパッケージ化された再利用可能なコードだ。
- `actions/checkout@v4`: リポジトリのコードをランナーにチェックアウト（クローン）するための公式アクションだ。これがないと、ランナーはリポジトリのファイルにアクセスできない。

#### 8. `uses: actions/setup-node@v4`

- Node.js 環境をセットアップするための公式アクションだ。
- `with: node-version: "20"`: このアクションに渡す引数で、Node.js のバージョンを `20` に指定している。

#### 9. `run: npm ci`

- これは、ランナー上で**シェルコマンド**を実行するための指示だ。
- `npm ci`: 依存関係をクリーンにインストールするためのコマンド。CI 環境で推奨される。

#### 10. `working-directory: frontend`

- `run` コマンドや `uses` アクションが実行される**ディレクトリ**を指定する。
- デフォルトでは、ジョブはリポジトリのルートディレクトリで実行される。しかし、プロジェクトでは `package.json` やソースコードが `frontend` ディレクトリ内にあるため、この設定が必要だった。これにより、`npm ci` や `npm run lint` などのコマンドが `frontend` ディレクトリ内で実行されるようになる。

### CI ワークフローがやっていること

この `main.yml` は、コードが GitHub にプッシュされたり、プルリクエストが作成されたりするたびに、以下のことを自動的に実行する。

1.  **コードのチェックアウト**: リポジトリのコードを GitHub Actions の仮想マシンにコピーする。
2.  **Node.js のセットアップ**: Node.js のバージョン 20 をインストールする。
3.  **依存関係のインストール**: `frontend` ディレクトリに移動し、`package-lock.json` に基づいてプロジェクトの依存関係をインストールする。
4.  **リンティングの実行**: `frontend` ディレクトリで `npm run lint` コマンドを実行し、コードのスタイルや潜在的なエラーをチェックする。
5.  **型チェックとビルドの実行**: `frontend` ディレクトリで `npm run build` コマンドを実行し、TypeScript の型エラーがないか確認し、本番用のビルドが可能か検証する。

これらのステップがすべて成功すれば、CI は「パス」となり、コードが品質基準を満たしていることを示す。もし途中でエラーが発生すれば、CI は「失敗」となり、問題があることを教えてくれる。

### より使いこなすために\_GitHub Actions のよく使われる機能と知っておくべきことの紹介

GitHub Actions の力をさらに引き出すための「よく使われる機能」や「知っておくべきこと」を以下に示す。これらは、より複雑なパイプラインを構築したり、効率を上げたりする上で非常に役立つ。

1.  **キャッシュ (Caching)**

    - **目的**: 依存関係のインストール時間を短縮し、ワークフローの実行速度を向上させる。
    - **解説**: `npm ci` や `yarn install` などでインストールされる `node_modules` ディレクトリは非常に大きい。これをキャッシュすることで、次回の実行時に再ダウンロード・再インストールをスキップできる。
    - **例**: `actions/cache` アクションを使用する。
      ```yaml
      - name: Cache Node modules
        uses: actions/cache@v4
        with:
          path: frontend/node_modules # キャッシュするパス
          key: ${{ runner.os }}-node-${{ hashFiles('frontend/package-lock.json') }} # キャッシュキー
          restore-keys: |
            ${{ runner.os }}-node-
      ```

2.  **マトリックスビルド (Matrix Builds)**

    - **目的**: 複数の環境（Node.js のバージョン、OS など）で同時にテストやビルドを実行する。
    - **解説**: `strategy.matrix` を使うことで、異なる組み合わせの環境でジョブを並列実行できる。
    - **例**:
      ```yaml
      jobs:
        test:
          runs-on: ubuntu-latest
          strategy:
            matrix:
              node-version: [18, 20] # Node.js 18と20でテスト
          steps:
            - uses: actions/setup-node@v4
              with:
                node-version: ${{ matrix.node-version }}
            # ... 依存インストールとテスト
      ```

3.  **アーティファクト (Artifacts)**

    - **目的**: ワークフローの実行結果（ビルドされたファイル、テストレポートなど）を保存し、他のジョブや後でダウンロードできるようにする。
    - **解説**: `actions/upload-artifact` と `actions/download-artifact` アクションを使用する。
    - **例**:
      ```yaml
      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: my-app-build
          path: frontend/out # ビルド成果物のパス
      ```

4.  **環境 (Environments)**

    - **目的**: デプロイ環境（開発、ステージング、本番など）を定義し、環境固有のルール（承認プロセス、シークレットなど）を適用する。
    - **解説**: GitHub リポジトリの「Environments」設定とワークフローの `environment` キーを組み合わせて使用する。

5.  **ワークフローディスパッチ (Workflow Dispatch)**

    - **目的**: GitHub の UI から手動でワークフローを実行できるようにする。
    - **解説**: `on:` セクションに `workflow_dispatch:` を追加する。入力パラメータを定義することもできる。
    - **例**:
      ```yaml
      on:
        workflow_dispatch:
          inputs:
            logLevel:
              description: "Log level"
              required: true
              default: "warning"
              type: choice
              options:
                - info
                - warning
                - debug
      ```

6.  **条件付きステップ/ジョブ (Conditional Steps/Jobs)**

    - **目的**: 特定の条件が満たされた場合にのみステップやジョブを実行する。
    - **解説**: `if:` キーと式を使用する。
    - **例**:
      ```yaml
      - name: Deploy to production
        if: github.ref == 'refs/heads/master' && success() # masterブランチへのプッシュで、かつ前のステップが成功した場合のみデプロイ
        run: # ... デプロイコマンド
      ```

7.  **再利用可能なワークフロー (Reusable Workflows)**

    - **目的**: 複数のワークフローで共通のロジックを再利用する。
    - **解説**: 共通のワークフローを定義し、他のワークフローから `uses:` キーで呼び出す。大規模なプロジェクトでパイプラインを整理するのに非常に有効だ。

8.  **自己ホスト型ランナー (Self-hosted Runners)**
    - **目的**: GitHub が提供するランナーではなく、独自のサーバーやマシンでワークフローを実行する。
    - **解説**: 特定のハードウェア要件、ネットワークアクセス、またはカスタムソフトウェアが必要な場合に利用する。
