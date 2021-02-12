const WebSocket = require("ws"), { EventEmitter } = require('events'), { constants, OPCODES } = require("../constants/consts.js"), payloads = require("../constants/payloads.js");

class WebSocketManager extends EventEmitter {
    constructor(client) {
        super();
        this.ws = WebSocket;
        this.interval = 0;
        this.client = client;
    }
    async connect(token) {
        try {
            this.ws = new WebSocket(constants.GATEWAY);
            this.ws.on('message', async (msg) => {
                const payload = JSON.parse(msg.toString()),
                    { t: event, op } = payload;

                switch (op) {
                    case OPCODES.DISPATCH:
                        break;
                    case OPCODES.HELLO:
                        const { heartbeat_interval } = payload.d;
                        this.interval = this.heartbeat(heartbeat_interval);
                        await this.identify(token);
                        break;
                    case OPCODES.HEARTBEAT_ACK:
                        break;
                }
                if (event) {
                    try {
                        const Module = await require(`../handlers/${event}.js`);
                        Module.execute(this.client, payload);
                    } catch (e) { }
                }
            });
        } catch (e) {
            console.log(e);
            return e;
        }
    }
    heartbeat(ms) {
        return setInterval(() => {
            this.ws.send(JSON.stringify(payloads.Heartbeat));
        }, ms);
    }
    async identify(token) {
        payloads.Identify.d.token = token;
        return this.ws.send(JSON.stringify(payloads.Identify));
    }
}

module.exports = WebSocketManager;