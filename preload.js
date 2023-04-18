const { contextBridge, ipcRenderer } = require('electron');
const Toastify = require('toastify-js');
const Discord = require('discord.js')

contextBridge.exposeInMainWorld('Toastify', {
    toast: (options) => Toastify(options).showToast(),
});

const webhookSystem = {
    sendWebhook: (url, title, color, desc, image) => {
        const webhookClient = new Discord.WebhookClient({ url: url });
        let embed = new Discord.MessageEmbed();
        embed.setTitle(title)
        embed.setColor(color)
        embed.setDescription(desc)
        if (image) {
            embed.setImage(image)
        }
        webhookClient.send({embeds: [embed]})
    }
}

contextBridge.exposeInMainWorld('webhookSystem', webhookSystem);