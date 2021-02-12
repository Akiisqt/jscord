const Discord = require("./jscord/index.js"), config = require("./config.json");
const client = new Discord.Client();

client.on("ready", () => {
    console.log(`${client.user.username} logged in!`);
});

client.on("message", async (message) => {
    if (message.author.bot) return;

    console.log(message.author.username + " (" + message.author.id + "): " + message.content);
    if (message.content == "!ping") {
        await Discord.createMessage("Pong", message.channel_id);
    }
});

client.login(config.token);