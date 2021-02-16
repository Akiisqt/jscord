const Client = require("../client/client.js"), fetch = require("node-fetch"), FormData = require("form-data"), { getBuf } = require("./getBuf.js"), { constants } = require("../constants/consts.js");
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
    let result = "";
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
* @param {Object}
* Options
*/
async function createMessage(channelId, options = { content: "", tts: false, attachments: { file: "", name: "" }, embeds: {}, reference: "" }) {
    let body, headers = { "Authorization": `Bot ${auth}` };

    if (options && options.attachments && options.attachments.file && options.attachments.name) {
        body = await createFormMessage({ content: options.content, tts: options.tts, attachments: { file: options.attachments.file, name: options.attachments.name }, embeds: options.embeds, reference: options.reference });
    } else {
        headers = { ...headers, "Content-Type": "application/json" };
        body = JSON.stringify({
            "content": options.content,
            "nonce": makeid(12),
            "tts": options.tts,
            "embed": options.embeds,
            "message_reference": { message_id: options.reference || null },
        });
    };

    const response = await fetch(`${constants.API}/channels/${channelId}/messages`, {
        method: "POST",
        headers,
        body,
    });
    console.log(response, response.status)
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

async function createFormMessage(options = { content: "", tts: false, attachments: { file: "", name: "" }, embeds: {}, reference: "" }) {
    console.log(options)
    const buf = await getBuf(options.attachments?.file) ?? Buffer.from("lmao xd", "utf8");
    const form = new FormData();
    form.append("content", options.content);
    form.append("nonce", makeid(12));
    form.append("tts", options.tts.toString());
    form.append("file", buf, { contentType: "image/gif", filename: options.attachments?.name ?? "file" });
    form.append("payload_json", JSON.stringify(
        {
            "embed": options.embeds,
            "message_reference": { message_id: options.reference || null },
        }));

    return form;
}

module.exports = {
    start,
    createMessage,
}