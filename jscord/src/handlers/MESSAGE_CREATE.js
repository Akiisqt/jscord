const Client = require("../client/client.js");

module.exports.execute = async function (client, payload) {
    // https://discord.com/developers/docs/resources/channel#message-object
    client.emit("message", payload.d);
};