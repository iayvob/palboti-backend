import mqtt from 'mqtt';
import dotenv from 'dotenv';

dotenv.config();

const brokerUrl = process.env.MQTT_BROKER_URL || '';
const options: mqtt.IClientOptions = {
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
};

const client = mqtt.connect(brokerUrl, options);

client.on('connect', () => {
  console.log('Connected to MQTT broker');

  const topic = process.env.MQTT_TOPIC || 'esp32/topic';
  client.subscribe(topic, (err) => {
    if (err) {
      console.error(`Failed to subscribe to topic '${topic}':`, err);
    } else {
      console.log(`Subscribed to topic '${topic}'`);
    }
  });
});

client.on('message', (topic, message) => {
  console.log(`Received message on topic '${topic}': ${message.toString()}`);
});

client.on('error', (err) => {
  console.error('MQTT client error:', err);
});

client.on('close', () => {
  console.log('Disconnected from MQTT broker');
});

export default client;
