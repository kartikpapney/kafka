const { kafka } = require("./client");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init() {
  const producer = kafka.producer();

  await producer.connect();

  rl.setPrompt("> ");
  rl.prompt();
  
  rl.on("line", async function (line) {
    const [type, msg] = line.split(" ");

    await producer.send({
      topic: type,
      messages: [
        {
          partition: 0,
          key: type,
          value: msg,
        },
      ],
    });
  }).on("close", async () => {
    await producer.disconnect();
  });
}

init();
