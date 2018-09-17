const PaginationEmbed = require('./PaginationEmbed');
const EmptyListException = require('../exceptions/EmptyListException');
const { MessageEmbed } = require('discord.js');
const _ = require('lodash');
const {
    functions: { splitText, imageUrl },
    fileDb: { translate },
} = require('../util');

const classColors = {
    archer: 0x79B21D,
    hunter: 0xDAA628,
    paladin: 0x24A2BF,
    priest: 0xF163B3,
    warrior: 0xB43026,
    wizard: 0x985ED5
};

class BerriesListEmbed extends PaginationEmbed {
    constructor (initialMessage, hero, page) {
        super(initialMessage);

        if (!hero) { throw new EmptyListException('Nothing to do without a hero'); }

        const embeds = hero.forms.map((form, idx, arr) =>
            _.reduce(form.passive_name ? splitText(translate(form.passive_description)) : [],
                (res, chunk, idx) => res.addField(idx ? '\u200b' : translate(form.passive_name), chunk),
                new MessageEmbed()
                    .setTitle(`${translate(form.name)} (${form.star}★)`)
                    .setThumbnail(imageUrl('skills/' + form.block_image))
                    .setFooter(`Page ${idx + 1}/${arr.length}`)
                    .addField(`${translate(form.block_name)} (Lv. ${form.skill_lvl})`, translate(form.block_description))
        ));

        this.setArray(embeds)
            .showPageIndicator(false)
            .setColor(classColors[hero.class]);

        if (page) {
            this.setPage(page);
        }
    }
}

module.exports = BerriesListEmbed;
