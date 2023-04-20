const { contextBridge, ipcRenderer } = require('electron');
const config = require('./config.js')
const fetch = require('node-fetch');
const Toastify = require('toastify-js');
const { alertError, alertSuccess } = require('./functions/toastify.js')
const Discord = require('discord.js')
const { Client, Intents, Message, Collection, MessageAttachment, ButtonInteracti, MessageActionRow, MessageButton, MessageEmbed, Permissions, Role, MessageSelectMenu, Modal, TextInputComponent } = require('discord.js');
const mongoose = require('mongoose');
const WOKCommands = require('wokcommands')
const path = require('path')
let client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.DIRECT_MESSAGES] });
let username;


///////////////////////////////////////////////////////////////////////////////////
// TOASTIFY ///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
contextBridge.exposeInMainWorld('Toastify', {
    toast: (options) => Toastify(options).showToast(),
});

///////////////////////////////////////////////////////////////////////////////////
// WEBHOOK SENDING SYSTEM /////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
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
    },
}
contextBridge.exposeInMainWorld('webhookSystem', webhookSystem);



///////////////////////////////////////////////////////////////////////////////////
// MAIN DISCORD BOT SYSTEM ////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
const discordSystem = {
    login: (token, ownerid, title, fields, form, status, mongo) => {
        try{
            console.log(mongo)
            if(!mongo){
                
            }else{
                connectDb(mongo);
            }
            
            client.login(token).catch(err => {
                alertError(err)
            })

            client.on('ready', async () => {
                await alertSuccess(`${client.user.username} is online now!`)
                username = client.user.username
                async function wait(f){
                    let r = f
                    while (!r) {
                        await delay(1000);
                        r = f
                    }
                    return f;
                }
                wait(username).then(title.innerHTML = client.user.username)
                fields.style.display = 'block';
                form.style.display = 'none';

                if(status){
                    try{
                        client.user.setActivity(status);
                        alertSuccess(`Status has been set to: ${status}`)
                    }catch(err){
                        alertError(err)
                    }            
                }
                let emptyObject;
                if(mongo){
                    emptyObject = {
                      commandsDir: path.join(__dirname, './bot/slashCommands'),
                      botOwners: [ownerid],
                      mongoUri: mongo
                    }
                }else{
                    emptyObject = {
                        commandsDir: path.join(__dirname, './bot/slashCommands'),
                        botOwners: [ownerid]
                      }
                }
                
                new WOKCommands(client, emptyObject)
                    .setDisplayName(client.user.username)
                    .setDefaultPrefix('.')
                    .setCategorySettings([
                        {
                          name: 'Discord Bot',
                          emoji: '🤖'
                        },
                      ])
            })

            client.on('messageCreate', async (message) => {
                if(message.content === "hello"){
                    message.reply("Hey!!!")
                }
            })

            client.on('interactionCreate', async interaction => {
                if (!interaction.customId) return;
                if (!interaction.customId.endsWith(interaction.user.id)) {
                    return interaction.reply({ content: `This is not your interaction! ${interaction.user.tag}`, ephemeral: true })
                  }
            })

            

            
        }catch(err){
            alertError(err)
        }

        //functions
        async function connectDb(url){
            await mongoose.connect(url)
            alertSuccess("Mongo DB connected!")
        }
    },
}

contextBridge.exposeInMainWorld('discordSystem', discordSystem);

///////////////////////////////////////////////////////////////////////////////////
// USER INFO SYSTEM ///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

const userInfoSystem = {
    
    getUserInfo: (clientId, token, title, fields, form, i1, i2, i3, i4) => {

    try{
        fetch(`https://discord.com/api/users/${clientId}`, {
            headers: {
            Authorization: `Bot ${token}`
        }
    })
    .then(res => res.json())
    .then(user => {
        if(user.code === 0){
            alertError("Invalid Token!")
            return;
        }
        if(!user.username){
            alertError("Invalid user ID!")
            return;
        }
        console.log(user)
        alertSuccess(`The user's tag is ${user.username}#${user.discriminator} and their ID is ${user.id}`);
        fields.style.display = 'block';
        form.style.display = 'none';
        title.innerHTML = `${user.username}#${user.discriminator}`
        i1.innerHTML = `banner: ${user.banner}`
        i2.innerHTML = `username: ${user.username}`
        i3.innerHTML = `discriminator: ${user.discriminator}`
        i4.innerHTML = `banner color: ${user.banner_color}`
    })
}catch(err){
        alertError(err)
}
}
}

contextBridge.exposeInMainWorld('userInfoSystem', userInfoSystem);