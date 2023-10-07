const { kafka } = require("./client");

const args = process.argv.slice(2);
const group = args.reduce((acc, val) => {
  return acc+val;
}, "")

async function init() {

  const consumer = kafka.consumer({ groupId: group });
  await consumer.connect();

  await consumer.subscribe({ topics: args, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      console.log(
        `Email Recieved: ${group}: [${topic}]: PART:${partition}:`,
        message.value.toString()
      );
    },
  });
}

init();
