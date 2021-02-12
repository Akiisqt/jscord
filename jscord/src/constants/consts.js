module.exports.constants = {
    GATEWAY: "wss://gateway.discord.gg/?v=8&encoding=json",
    API: "https://discord.com/api/v8"
}

module.exports.OPCODES = {
    DISPATCH: 0, // Dispatch, Receive, An event was dispatched.
    HEARTBEAT: 1, // Heartbeat, Send/Receive, Fired periodically by the client to keep the connection alive.
    IDENTIFY: 2, // Identify, Send, Starts a new session during the initial handshake.
    PRESENCE_UPDATE: 3, // Presence Update, Send, Update the client's presence.
    VOICE_STATE_UPDATE: 4, // Voice State Update, Send, Used to join/leave or move between voice channels.
    RESUME: 6, // Resume, Send, Resume a previous session that was disconnected.
    RECONNECT: 7, // Reconnect, Receive, You should attempt to reconnect and resume immediately.
    REQUEST_GUILD_MEMBERS: 8, // Request Guild Members, Send, Request information about offline guild members in a large guild.
    INVALID_SESSION: 9, // Invalid Session, Receive, The session has been invalidated. You should reconnect and identify/resume accordingly.
    HELLO: 10, // Hello, Receive, Sent immediately after connecting, contains the heartbeat_interval to use.
    HEARTBEAT_ACK: 11, // Heartbeat ACK, Receive, Sent in response to receiving a heartbeat to acknowledge that it has been received.
}