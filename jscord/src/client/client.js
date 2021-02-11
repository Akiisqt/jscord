const WebSocketManager = require("../ws/webSocketManager.js"), { EventEmitter } = require('events');

class Client extends EventEmitter {
    constructor() {
        super();
        this.ws = new WebSocketManager(this);
        this._user;
    }
    async login(token) {
        this.ws.connect(token);
    }
    set user(user) {
        this._user = user;
    }
    get user() {
        return this._user;
    }
}

module.exports = Client;