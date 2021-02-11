const Discord = require("./jscord/index.js");
const client = new Discord.Client();

client.on("ready", () => {
    console.log(`${client.user.username} logged in!`);
});

client.on("message", (message) => {
    console.log(message.content);
});

client.login("NzQ2ODIwMzE5MTEyNzI0NjUz.X0F4nw.7Lf-f_-fJ0YXelEpF7-2nhPfcRw");