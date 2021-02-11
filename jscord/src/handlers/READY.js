const Client = require("../client/client.js");

module.exports.execute = async function (client, payload) {
    const { user } = payload.d;
    client.user = {
        verified: user.verified,
        username: user.username,
        id: user.id,
        flags: user.flags,
        email: user.email,
        discriminator: user.discriminator,
        bot: user.bot,
        avatar: user.avatar,
    };
    console.log(`Logged in as ${client.user.username}!`);
}