const Discord = require("./jscord/index.js");
const client = new Discord.Client();

client.on("ready", () => {
    console.log(`${client.user.username} is online!`);
});

client.on("message", (message) => {
    console.log(message.content);
});

client.login("token");
