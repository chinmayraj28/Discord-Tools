const { MessageButton, MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');
let web = "<:web:1023298924817158214>"

module.exports = {
  category: 'Discord Bot',
  description: 'Test command.',
  cooldown: '10s',
  slash: 'both',

  callback: async ({ interaction }) => {
    interaction.reply({content: "Yes, Im here.", ephemeral: true })
    
  },
}