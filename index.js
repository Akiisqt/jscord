const Discord = require("./jscord/index.js"), config = require("./config.json");
const client = new Discord.Client({ intents: "513" });

client.on("ready", () => {
    console.log(`${client.user.username} logged in!`);
});

client.on("message", async (message) => {
    if (message.author.bot) return;
    let messageArray = message.content.split(" "), args = messageArray.slice(1);
    switch (messageArray[0]) {
        case "!ping":
            await Discord.createMessage(message.channel_id, { embeds: { "title": "H" }, reference: message.id });
            break;
        case "!eval":
            const t1 = new Date().getTime();
            try {
                await Discord.createMessage(message.channel_id, `\`\`\`js\n${eval(args.join(" "))}\`\`\``);
                const t2 = new Date().getTime();
                await Discord.createMessage(`${(t2 - t1)} ms`, message.channel_id);
            } catch (e) {
                await Discord.createMessage(message.channel_id, `\`\`\`diff\n-${e}\`\`\``);
                const t2 = new Date().getTime();
                await Discord.createMessage(`Took ${(t2 - t1)} ms`, message.channel_id);
            }
            break;
        default:
            console.log(message.content.split(" ")[0] + " wasn't a command!");
            break;
    }
});

client.login(config.token);