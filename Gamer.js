const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setGame("With games!");
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(cmd === `${prefix}gametalk`){
        return message.channel.send("You can talk about games in the games section on the left side of your screen.");
    }

    if(cmd === `${prefix}report`){
        
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!rUser) return message.channel.send("I couldn't find that user.");
        let reason = args.join(" ").slice(22);

        let reportEmbed = new Discord.RichEmbed()
        .setDescription("Reports")
        .setColor("#0054db")
        .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
        .addField("Reported by", `${message.author} with ID: ${message.author.id}`)
        .addField("Channel", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", reason);

        let reportschannel = message.guild.channels.find(`name`, "reports");
        if(!reportschannel) return message.channel.send("I couldn't find a reports channel.");
        
        message.delete().catch(O_o=>{});
        reportschannel.send(reportEmbed);

        return;
    }

    if(cmd === `${prefix}addgamesection`){
        return message.channel.send("If you want to suggest a game to add go to #game-requests.");  
    }

    if(cmd === `${prefix}hello`){
        return message.channel.send("Hello!")
    }

    if(cmd === `${prefix}help`){

        let botembed = new Discord.RichEmbed()
        .setDescription("Bot Commands")
        .setColor("#0054db")
        .addField("!gametalk", "Tells you where to talk about games.")
        .addField("!addgamesection", "Tells you how to possibly add a chat for the specified game")
        .addField("!hello", "Pretty simple.")
        .addField("!report (user) (reason)", "Report someone for scamming, stealing, etc. Please do not abuse this command.")
        .addField("Want to add a command or need more help?", "Dm Xydley#6621!")

        return message.channel.send(botembed);
    }

});

client.login(process.env.BOT_TOKEN);
