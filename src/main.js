console.log('Loading, please wait...');

const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'my-token';

client.on('ready', () => {
    console.log('Loaded discord.js!');
});

client.on('message', message => {
    if (message.author.bot) {
        return;
    }

    let args = message.content.split(' ');
    let author = message.author;

    if (args[0].toLowerCase() === "!admin") {
        console.log(author.username + ' -> ' + message.content);

        if (author.id !== "505201624294227998") {
            message.reply('You dont have permission!').catch(console.error);
            return;
        }

        if (args.length > 1) {
            if (args[1].toLowerCase() === "text") {
                message.reply('Hello!').catch(console.error);
                return;
            }

            if (args[1].toLowerCase() === "shutdown") {
                message.reply('Shutdown now...').catch(console.error);
                process.exit();
                return;
            }
        }

        message.reply('Usage: !admin <text|shutdown>').catch(console.error);
        return;
    }
});
client.login(token);
