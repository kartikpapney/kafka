const { kafka } = require("./client");
const topic = require('./topics.js');

async function init() {
  const admin = kafka.admin();
  await admin.connect();
  await admin.createTopics({
    topics: topic.map((t) => {
        return {topic: t, numPartitions: 1}
    })
  });
  await admin.disconnect();
}

init();
