# proto-jpnkn-mqtt

MQTTブローカーに接続し、指定したトピックのメッセージを標準出力へ表示するNode.jsアプリケーションです。
※ 特にjpnkn掲示板を想定しています。

JPNKN掲示板については次のURLを参照してください。
- https://bbs.jpnkn.com
- 及び、https://doc.bbs.jpnkn.com

## 必要なもの

- Node.js
- npm

## セットアップ

依存パッケージをインストールします。

```sh
npm install
```

環境変数を設定してください。

| 変数 | 説明 |
| --- | --- |
| `MQTT_URL` | MQTTブローカーの接続先URL |
| `MQTT_USERNAME` | 接続ユーザー名 |
| `MQTT_PASSWORD` | 接続パスワード |
| `TOPIC` | 購読するトピック。複数指定する場合はカンマ区切り |

接続先と認証情報の詳細は[掲示板のドキュメント](https://doc.bbs.jpnkn.com)を参照してください。

### miseを使う場合

`mise.local.toml-example`を`mise.local.toml`にコピーし、接続先、認証情報、購読トピックを設定します。`mise.local.toml`には認証情報が含まれるため、公開リポジトリへコミットしないでください。

```sh
cp mise.local.toml-example mise.local.toml
```

Node.jsとnpmはmiseでインストールできます。

```sh
mise install
npm install
```

## 起動

環境変数を設定した状態で実行します。

```sh
npm start
```

接続後、購読したトピック名と受信メッセージが次の形式で表示されます。

```text
[トピック名] メッセージ本文

# サンプル
[bbs/tetsuyainfra] {"body":"DEV名無しさん<><>2026/10/26(月) 14:53:53.70<>test<>","no":"548","bbsid":"tetsuyainfra","threadkey":"1612437074"}
```


`Ctrl+C`（`SIGINT`）または`SIGTERM`を受け取ると、MQTT接続を終了します。
