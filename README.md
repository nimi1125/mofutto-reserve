# もふっと予約

<p style="display: inline">
    <img src="https://img.shields.io/badge/-Laravel-f3a68c.svg?logo=laravel&style=for-the-badge">
    <img src="https://img.shields.io/badge/-React-bdf1ff.svg?logo=react&style=for-the-badge">
    <img src="https://img.shields.io/badge/-Inertia.js-a9fca9.svg?logo=Inertia.js&style=for-the-badge">
    <img src="https://img.shields.io/badge/-Mysql-c1dff5.svg?logo=mysql&style=for-the-badge">
    <img src="https://img.shields.io/badge/-Docker-1488C6.svg?logo=docker&style=for-the-badge">
</p>

## アプリ概要

「もふっと予約」は、ぬいぐるみの修理・クリーニングをオンラインで予約できるアプリケーションです。  
ユーザーは予約の作成・管理ができ、管理者はすべての予約を確認・編集できます。

## 主な機能

### ユーザー側
- 修理予約の作成
- 予約内容の確認・変更・削除

### 管理者側
- 全予約の一覧表示
- 各予約の編集・削除（ぬいぐるみ状態の変更を含む）

## 今後の課題・改善点

- フラッシュメッセージが一部画面で安定して表示されないため、表示制御の改善予定
- ログイン・ログアウト時にまれに不安定な挙動がある（例外処理で一部対応済）
- ユーザーと管理者で認証ページやロジックが別ファイルになっており、コードの共通化の余地がある
- 予約フォームにおいて、住所や電話番号の入力に制約を設けていないため（例：郵便番号にハイフンの有無が統一されていないなど）、登録データにばらつきが生じている。入力フォーマットのバリデーションを強化し、データの統一性を保つ対応が望ましい。
- また、郵便番号から自動で都道府県・市区町村を補完する仕組みを導入すれば、ユーザーの入力負担軽減および入力ミスの防止にもつながると考えられる。


## テストアカウント

- 一般ユーザー  
  Email: `user@example.com`  
  Password: `password`

- 管理者ユーザー  
  Email: `admin@example.com`  
  Password: `password`

## 開発環境の構築方法

### 構築環境

docker
laravel 12（sail利用）

1. git clone
~~~
git clone ~~~
~~~
2. 環境変数ファイルの作成

clone したディレクトリへ移動
~~~
cd ~~~
cp .env.example .env
~~~
3. パッケージインストール
~~~
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php81-composer:latest \
    composer install --ignore-platform-reqs
~~~
4. Dockerコンテナ起動
~~~
./vendor/bin/sail up -d
~~~
5. APP_KEYの生成
~~~
./vendor/bin/sail artisan key:generate
~~~

6. フロントパッケージインストール
~~~
./vendor/bin/sail npm install
./vendor/bin/sail npm run dev
~~~

7. マイグレーション
~~~
./vendor/bin/sail artisan migrate
~~~

8.シーダー実行
~~~
./vendor/bin/sail　artisan db:seed
~~~
