const { Kafka } = require("kafkajs");
const dotenv = require('dotenv');
dotenv.config();
exports.kafka = new Kafka({
  clientId: process.env.CLIENT,
  brokers: [process.env.BROKER],
});