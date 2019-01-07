console.log('Loading, please wait...');

const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'my-token';

const credential = require('./credential.json');
const ytdl = require('ytdl-core');

client.on('ready', () => {
    console.log('Loaded discord.js!');
    client.user.setPresence({
        game: {
            name: "Hello, Rio!",
            type: "PLAYING"
        },
        status: 'online'
    });
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

            if (args[1].toLowerCase() === "join") {
                message.reply('Joining...').catch(console.error);

                let voiceChannel = client.channels.get('531773797863391255');
                voiceChannel.join().then(connection => {
                    const dispatcher = connection.playFile('defy.mp3');
                    dispatcher.on('end', end => { voiceChannel.leave() });
                }).catch(console.error);
                return;
            }

            if (args[1].toLowerCase() === "play") {
                if (args.length > 2) {
                    streamOptions = { seek: 0, volume: 1 }

                    let voiceChannel = client.channels.get('531773797863391255');
                    voiceChannel.join().then(connection => {
                        let stream = ytdl(args[2], { filter: 'audioonly' });
                        stream.
                        let dispatcher = connection.playStream(stream, streamOptions);
                        // dispatcher.on('end', end => { voiceChannel.leave() });
                    }).catch(console.error);
                    return;
                }
                message.reply("Usage: !admin play <youtube-url>")
                return;
            }

            if (args[1].toLowerCase() === "leave") {
                let voiceChannel = client.channels.get('531773797863391255');
                voiceChannel.leave();
            }
        }

        message.reply('Usage: !admin <text|shutdown>').catch(console.error);
        return;
    }
});
client.login(token);
