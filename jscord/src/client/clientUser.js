class clientUser {
    constructor(client, user) {
        this.verified = user.verified;
        this.username = user.username;
        this.id = user.id;
        this.flags = user.flags;
        this.email = user.email;
        this.discriminator = user.discriminator;
        this.bot = user.bot;
        this.avatar = user.avatar;

    }
}

module.exports = clientUser;