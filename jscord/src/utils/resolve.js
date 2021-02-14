const Client = require("../client/client.js"), fetch = require("node-fetch"), { constants } = require("../constants/consts.js");
var auth;


/**
* Gives token to resolve.
* https://discord.com/developers/applications
* @param {String}
* Token
*/
class start {
    constructor(token) {
        auth = token;
    }
}

function makeid(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
/**
* Creates message.
* https://discord.com/developers/docs/resources/channel#create-message
* @param {Number}
* Channel_ID
* @type {}
* Options
*/
async function createMessage(channelId, options = { content: "", tts: false, embeds: {}, reference: {} }, nonce) {
    if (!nonce) nonce = makeid(12);
    const data = {
        "content": options.content,
        nonce,
        "tts": options.tts,
        "embed": options.embeds,
        "message_reference": { message_id: options.reference || null },
    };
    /*var data = new Object(); // We'll have to do attachment form data crap later
    if (!options.attachments) {
        data = {
            "content": options.content,
            nonce,
            "tts": options.tts,
            "embed": options.embeds,
            "message_reference": { message_id: options.reference || null },
        };
    } else {
        if (options.embeds || options.reference) console.warn("Embed & Reference can't be used with attactments.");
        data = {
            "content": options.content,
            nonce,
            "tts": options.tts,
            "file": "",
            "payload_json"
        }; 
    }*/
    const headers = { "Content-Type": "application/json", "Authorization": `Bot ${auth}` };

    const response = await fetch(`${constants.API}/channels/${channelId}/messages`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
    });

    if (response.status === 429) {
        const wait = parseInt(response.headers.get("Retry-After")) * 1000;
        console.log(`Rate limit hit! Waiting ${wait}ms. (raw: ${(wait / 1000)})`);
        setTimeout(function () {
            createMessage(channelId, options);
        }, wait);
    } else {
        response.json().then((msg) => {
            console.log(`MessageCreate: ${msg.id}`);
        });
    }
}

module.exports = {
    start,
    createMessage,
}