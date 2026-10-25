import mqtt from "mqtt";

// 受信できるメッセージの形式
// {"body":"DEV名無しさん<><>2026/10/26(月) 14:58:10.20<>デバッグ用すれ<>デバッグ用/1","no":"1","bbsid":"tetsuyainfra","threadkey":"1792994290"}

const TOPIC =  process.env.TOPIC.split(",");
const MQTT_URL = process.env.MQTT_URL;
const MQTT_USERNAME = process.env.MQTT_USERNAME;
const MQTT_PASSWORD = process.env.MQTT_PASSWORD;

const client = mqtt.connect(MQTT_URL, {
  username: MQTT_USERNAME,
  password: MQTT_PASSWORD,
});

client.on("connect", () => {
  console.log("connected");
  client.subscribe(TOPIC, (err) => {
    if (err) console.error("subscribe error:", err);
    else console.log(`subscribed: ${TOPIC}`);
  });
});

client.on("message", (topic, payload) => {
  console.log(`[${topic}] ${payload.toString()}`);
});

client.on("error", (err) => console.error("error:", err));

// この時点ではイベントループ(mqttクライアント)が残っているのでnodejsは終了しない。
// プロセスを明示的に終了させるために SIGINT または SIGTERM を監視する。
const shutdown = () => {
  console.log("closing...");
  client.end(false, () => process.exit(0));
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
