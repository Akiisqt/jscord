const Discord = require("./jscord/index.js"), fetch = require("node-fetch"), { constants, OPCODES } = require("./jscord/src/constants/consts.js");
const client = new Discord.Client();

client.on("ready", () => {
    console.log(`${client.user.username} logged in!`);
});

client.on("message", async (message) => {
    console.log(message.author.username + " (" + message.author.id + "): " + message.content);
    if (message.content == "!ping") {
        await createMessage("Pong", message.channel_id);
    }
});

async function createMessage(content, channelId) {
    const data = {
        "content": content,
        "tts": false
    };

    const headers = { "Content-Type": "application/json", "Authorization": `Bot ${client.token}` };

    const response = await fetch(`${constants.API}/channels/${channelId}/messages`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
    });

    const json = await response.json();
    console.log(json);
}

client.login("token");