const Client = require("../client/client.js"), clientUser = require("../client/clientUser.js");

module.exports.execute = async function (client, payload) {
    const { user } = payload.d;
    client.user = new clientUser(client, user);

    client.emit("ready");
}