const fetch = require("node-fetch"), fs = require("fs");

module.exports = {
    getBuf: async function (path) {
        var buf;

        try {
            if (path.startsWith("http")) {
                const response = await fetch(path), content = response.headers.get("content-type");
                if (content && content.startsWith("image/")) {
                    buf = response.buffer();
                }
            } else if (fs.existsSync(path)) buf = fs.readFileSync(path);
        } catch (e) {
            console.log(e)
            return buf;
        }
        return buf;
    }
}