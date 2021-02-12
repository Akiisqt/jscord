
module.exports.Hello = {
    op: 10,
    d: null,
}

module.exports.Heartbeat = {
    op: 1,
    d: null,
}

module.exports.Identify = {
    op: 2,
    d: {
        token: "",
        intents: "",
        properties: {
            $os: "ms-dos 1999 (c) microcord",
            $browser: "jscord",
            $device: "jscord",
        },
    },
}
