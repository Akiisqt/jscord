const Client = require("../client/client.js");

module.exports.execute = async function (client, payload) {
    client.emit("message", payload.d);
};