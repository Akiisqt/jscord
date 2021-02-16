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
            const tt1 = new Date().getTime();
            await Discord.createMessage(message.channel_id, { content: "Pong", reference: message.id });
            const tt2 = new Date().getTime();
            console.log(tt2 - tt1);
            break;
        case "!eval":
            const t1 = new Date().getTime();
            try {
                await Discord.createMessage(message.channel_id, { content: `\`\`\`js\n${eval(args.join(" "))}\`\`\`` });
                const t2 = new Date().getTime();
                await Discord.createMessage(message.channel_id, { content: `Took ${(t2 - t1)} ms` });
            } catch (e) {
                await Discord.createMessage(message.channel_id, { content: `\`\`\`diff\n-${e}\`\`\`` });
                const t2 = new Date().getTime();
                await Discord.createMessage(message.channel_id, { content: `Took ${(t2 - t1)} ms` });
            }
            break;
        default:
            console.log(message.content.split(" ")[0] + " wasn't a command!");
            break;
    }
});

client.login(config.token);