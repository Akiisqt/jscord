const WebSocketManager = require("../ws/webSocketManager.js"), { EventEmitter } = require('events');

class Client extends EventEmitter {
    constructor({ intents }) {
        super();
        this.ws = new WebSocketManager(this);
        this.token;
        this._user;
        this.intents = intents;
    }
    /**
   * Attepts connection to discord-gateway.
   * https://discord.com/developers/applications
   * @param {String}
   * Token
   */
    async login(token) {
        this.token = token;
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