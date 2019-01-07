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
                        message.reply("Downloading audio...");
                        let stream = ytdl(args[2], { filter: 'audioonly' });
                        let dispatcher = connection.playStream(stream, streamOptions);
                        ytdl.getInfo(args[2], function(error, info) {
                            message.reply("Now Playing: " + info.title);
                            setGame(info.title);
                        });
                        dispatcher.on('end', end => { setGame("Hello, Rio!") });
                    }).catch(console.error);
                    return;
                }
                message.reply("Usage: !admin play <youtube-url>");
                return;
            }

            if (args[1].toLowerCase() === "title") {
                if (args.length > 2) {
                    ytdl.getInfo(args[2], function (error, info) {
                        message.reply("Author: " + info.author.name + "\nTitle: " + info.title + "\nDuration: " + info.length_seconds);
                    });
                    return;
                }
                message.reply("Usage: !admin title <url>")
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

function setGame(game) {
    client.user.setPresence({
        game: {
            name: game,
            type: "STREAMING",
            url: "https://twitch.tv/unknown"
        },
        status: 'online'
    });
}
