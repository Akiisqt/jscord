const Discord = require("./jscord/index.js"), fetch = require("node-fetch"), { constants } = require("./jscord/src/constants/consts.js"), config = require("./config.json");
const client = new Discord.Client();

client.on("ready", () => {
    console.log(`${client.user.username} logged in!`);
});

client.on("message", async (message) => {
    if (message.author.bot) return;

    console.log(message.author.username + " (" + message.author.id + "): " + message.content);
    if (message.content == "!ping") {
        await createMessage("Pong", message.channel_id);
    }
});

function makeid(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

async function createMessage(content, channelId, nonce) {
    if (!nonce) {
        nonce = makeid(12);
    }

    const data = {
        "content": content,
        "tts": false,
        nonce
    };

    const headers = { "Content-Type": "application/json", "Authorization": `Bot ${client.token}` };

    const response = await fetch(`${constants.API}/channels/${channelId}/messages`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
    });

    if (response.status === 429) {
        const wait = parseInt(response.headers.get("Retry-After")) * 1000;
        console.log(`Rate limit hit! Waiting ${wait}ms. (raw: ${(wait / 1000)})`);
        setTimeout(function () {
            createMessage(content, channelId);
        }, wait);
    } else {
        response.json().then((msg) => {
            console.log(`MessageCreate: ${msg.id}`);
        });
    }
}

client.login(config.token);