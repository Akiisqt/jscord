const WebSocketManager = require("../ws/webSocketManager.js"), { EventEmitter } = require('events'), { start } = require("../utils/resolve.js");

class Client extends EventEmitter {
    constructor({ intents = "32509" } = {}) {
        super();
        this.ws = new WebSocketManager(this);
        this.token;
        this.intents = intents;
        this._user;
    }
    /**
   * Attepts connection to discord-gateway.
   * https://discord.com/developers/applications
   * @param {String}
   * Token
   */
    async login(token) {
        this.token = token;
        new start(this.token);
        this.ws.connect(this.token, this.intents);
    }
    set user(user) {
        this._user = user;
    }
    get user() {
        return this._user;
    }
}

module.exports = Client;