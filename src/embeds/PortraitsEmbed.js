const PaginationEmbed = require('./PaginationEmbed');
const { MessageEmbed } = require('discord.js');
const {
    functions: { imageUrl },
} = require('../util');

class PortraitsEmbed extends PaginationEmbed {
    constructor (initialMessage, portraits, page) {
        super(initialMessage);

        if (!Array.isArray(portraits))
            portraits = [portraits];

        const embeds = portraits.map(portrait =>
            new MessageEmbed()
                .setImage(imageUrl('portraits/' + portrait))
        );

        this.setArray(embeds)
            .showPageIndicator(false);

        if (page) {
            this.setPage(page);
        }
    }
}

module.exports = PortraitsEmbed;