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
        properties: {
            $os: 'iOS',
            $browser: "Discord iOS",
            $device: "js"
        },
    },
}