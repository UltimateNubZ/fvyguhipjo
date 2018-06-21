// const http = require('http');
// const express = require('express');
// const app = express();
// app.get("/", (request, response) => {
//   console.log(Date.now() + " Ping Received");
//   response.sendStatus(200);
// });
// app.listen(process.env.PORT);
// setInterval(() => {
//   http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
// }, 280000);
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

const ms = require("ms")

const urban = module.require("urban");

const superagent = require("superagent")

const fs = require("fs");

let xp = require("./xp.json")
let config = require("./config.json")




bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);

  bot.user.setActivity("Spooky Games | p%help", {type: "PLAYING"})

  //bot.user.setGame("on SourceCade!");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm"){
let replies = ["hallo", "sup", "no jelly for you", "do you want jelly?", "go away", "the jelly has lime flavour", "this is a loop u know right?", "you smelly m8", "hmmmm", "xD" ]

let result = Math.floor((Math.random() * replies.length))
    message.author.send(replies[result])
    
  }
  

  let prefix = "p%"
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  
  
  if(cmd == `${prefix}template`){
    if(message.author.id !="251303518982504449") return message.reply("this is a bot owner only command")
    message.channel.send("```if(cmd === ${prefix} ){}```")
  }
  
  let xpAdd = Math.floor(Math.random() * 7) + 8;

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }


  let curxp = xp[message.author.id].xp;
  var curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 300;
  xp[message.author.id].xp =  curxp + xpAdd;
  if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    let lvlup = new Discord.RichEmbed()
    .setTitle("Level Up!")
    .setColor("#ff0000")
    .addField("New Level", curlvl + 1);

    message.channel.send(lvlup).then(msg => {msg.delete(5000)});
  }
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
  });


  if(cmd == "xD"){
    
    let emoji = message.guild.emojis.find(`name`, "penguinguy")
    message.react(`😂`)
  }
  if(cmd == ":3"){
    
    let emoji = message.guild.emojis.find(`name`, "penguinguy")
    message.react(`🐱`)
  }
  if(cmd == "oof"){
    try{
    await message.react(`🇴`)
    await message.react(`🅾`)
    await message.react(`🇫`)
  }catch(e){
    message.channel.send(e)
  }
    
  }
  if(cmd === `${prefix}level`){
  if(!xp[message.author.id]){
   xp[message.author.id] = {
     xp: 0,
     level: 1
  };
}
  let curxp = xp[message.author.id].xp;
  var curlvl = xp[message.author.id].level;
  let nxtLvlXp = curlvl * 300;
  let difference = nxtLvlXp - curxp;

  let lvlEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("#ff0000")
  .addField("Level", curlvl, true)
  .addField("XP", curxp, true)
  .setFooter(`${difference} XP til level up`, message.author.displayAvatarURL);

  message.channel.send(lvlEmbed)

  if(e) message.channel.send(`Operation: Failed Reason: ${e}`)
}
  var llama = message.guild.roles.find(`name`, "Muting Power");
  if(!llama)message.guild.owner.send("Please create a role called Muting Power")
  if(curlvl >=300) message.member.addRole(llama)
  
  if(cmd === `${prefix}suggest`){
    let suggestion = args.join(" ")
    bot.users.get("251303518982504449").send(`${suggestion} was suggested by ${message.author} in ${message.member.guild}`);
    message.delete().catch(O_o=>{});
  }
     if(cmd === `${prefix}levelset`){
       if(!args[0]) return message.reply("You havnt mentioned a level or tag")
       if(!args[1]) return message.reply("You havnt mentioned a tag")
       
       let member = message.author
       
       var curlvl = xp[member.id].level
       let newxp = xp[member.id].xp
    
    if (!curlvl) {
        curlvl = {
          xp: 0,
          level: 1
        };
      }
      let coinAmount = args[0]
      curlvl = {
        xp: newxp,
        level: coinAmount
      }
      message.channel.send(`${coinAmount} is now your current level`).catch(err => {})
      fs.writeFile('./xp.json', JSON.stringify(level), (err) => {
        if(err) message.channel.send(`Something went wrong while adding levels! reason:${err}`);
        if(err) console.log(err)
    })
  }

  if(cmd === `${prefix}kick`){

    //!kick @daeshan askin for it

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Can't find user!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#e56b00")
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Tiime", message.createdAt)
    .addField("Reason", kReason);

    let kickChannel = message.guild.channels.find(`name`, "incidents");
    if(!kickChannel) return message.channel.send("Can't find incidents channel.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
    message.delete().catch(O_o=>{});

    return;
  }
  
  if(cmd === `${prefix}destroy`){
    if(message.author.id !="251303518982504449") return message.reply("Only for owner of bot")
    let newammount = bot.guilds.size -
    message.channel.send(newammount)
  }
  
  if(cmd === `${prefix}add`){
    if(message.author.id !="251303518982504449") return message.reply("Only for owner of bot")
    
    let number2 = Number(args[1])
    let number = Number(args[0])
    let magic = number - number2
    let magicadd = number + number2
    let magicx = number * number2
    
    
     message.channel.send(magicadd)
  }
  
  
  if(message.content == "wat"){
    message.delete().catch(O_o=>{});
  }
  
  
  if(cmd === `${prefix}8ball`){
    if(!args[2]) return message.reply("Please ask a full question")
let replies = ["Yes", "No", "Not sure", "Ask again later", "Why would you ask me that"]

let result = Math.floor((Math.random() * replies.length))
let question = args.join(" ")

let ballembed = new Discord.RichEmbed()
.setTitle(":8ball: 8ball time")
.setFooter(message.author.tag)
.setColor("#ff9900")
.addField("Question", question)
.addField("Awnser", replies[result])

message.channel.send(ballembed)
  }
  
  if(cmd === `${prefix}color`){
    let colors = message.guild.roles.filter(role => role.name.startsWith("#"))
    if(colors.size < 1) return message.channel.send("There are no colors in this server")

    let str = args.join(" ")
    let role = colors.find(role => role.name.slice(1).toLowerCase() === str.toLowerCase())

    if(!role) return message.channel.send("This color does not exist!")

    try {
        await message.member.removeRoles(colors)
        await message.member.addRole(role)
        message.channel.send(`You now have the color ${role}`)
     } catch(e) {
         message.channel.send(`Operation failed! ${e.message}`)

     }
  }
  
  if(cmd == `${prefix}ping`){
    message.channel.send("pong")
  }
   
  if(cmd === `${prefix}homework`){
      let ehome = new Discord.RichEmbed()
      .setFooter("World Cup Words Homework")
      .setTitle("Words:")
      .addField("Goal", "Tor")
      .addField("Football", "Fußball")
      .addField("You Can do it", "du kannst es schaffen")
      .addField("bravo","Bravo")
      .addField("score","Ergebnis")
      .addField("Good Job","Gut gemacht")
      .addField("Great play","Tolles Spiel")
      .addField("Congrats", "Glückwunsch")
      .setColor("#3c7ee8")

      message.channel.send(ehome)
      
  }
  
  if(cmd===`${prefix}doggo`){
    message.react(`🐶`)
    let {body} = await superagent
    .get(`https://random.dog/woof.json`)

    let dogembed = new Discord.RichEmbed()
    .setColor("#ff9900")
    .setTitle("Doggo :dog:")
    .setImage(body.url)

    message.channel.send(dogembed)

}

  
  if(cmd === `${prefix}colors`){
    let colors = message.guild.roles.filter(role => role.name.startsWith("#"))
    if(colors.size < 1) return message.channel.send("There are no colors in this server to add a color start it with `#` and give it a personal color")

    message.channel.send(colors.array().join(" "))
    message.channel.send("to add a color to your role say `<prefix>color <color name no hashtag>` to add more colors to the server begin any role with `#` and give it your own color")
  }
  
    
  
    
  if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Can't find user!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#bc0000")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason)

    let incidentchannel = message.guild.channels.find(`name`, "incidents");
    if(!incidentchannel) return message.channel.send("Can't find incidents channel.");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);
    message.delete().catch(O_o=>{});


    return;
  }


  if(cmd === `${prefix}report`){

    //!report @ned this is the reason

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Couldn't find user.");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#15f153")
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", rreason);

    let reportschannel = message.guild.channels.find(`name`, "reports");
    if(!reportschannel) return message.channel.send("Couldn't find reports channel.");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return;
  }
  
  if(cmd === "test"){
    if(message.author.id !="251303518982504449") return message.reply("only for owner")
    message.react(`😂`)
  }




  if(cmd === `${prefix}serverinfo`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);

    return message.channel.send(serverembed);
  }
  
  if(cmd === `${prefix}removerole`){
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Sorry pal, you can't do that.");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Couldn't find that user.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Specify a role!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Couldn't find that role.");

  if(!rMember.roles.has(gRole.id)) return message.reply("They don't have that role.");
  await(rMember.removeRole(gRole.id));

  try{
    await rMember.send(`RIP, you lost the ${gRole.name} role.`)
  }catch(e){
    message.channel.send(`RIP to <@${rMember.id}>, We removed ${gRole.name} from them. We tried to DM them, but their DMs are locked.`)
  }
    message.delete().catch(O_o=>{});
  
  }
  
  if(cmd === `${prefix}clear`){

   let clearChannel = message.guild.channels.find(`name`, "incidents")
   let reason = args.slice(1).join(" ");
    
    
    try{
    await message.delete().catch(O_o=>{});
    }catch(e){
     message.channel.send(e)
    }
    if (!reason) return message.channel.send("please provide a reason")

    
let clearEmbed = new Discord.RichEmbed()
.setDescription ("Clear")
.setColor("#285fb7")  
.addField("Cleared by", `${message.author} with ID: ${message.author.id}`)
.addField("Time:", message.createdAt)
.addField("Channel:", message.channel)
.addField("Cleared ammount of messages:", `${args[0]}`)
.addField("Reason",`${reason}`)

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Permissions m8")
    if(!args[0]) return message.channel.send("00f")
    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`Cleared ${args[0]} messages`).then(msg => msg.delete(5000))
        clearChannel.send(clearEmbed)
        
       })
  }
  if(cmd === `${prefix}randomurban`){
  urban.random().first(json => {
        if(!json) return message.channel.send("No results found")
        
        let embed = new Discord.RichEmbed()
        .setTitle(json.word)
        .setDescription(json.definition)
        .addField(":thumbsup:", json.thumbs_up, true)
        .addField(":thumbsdown:", json.thumbs_down, true)
        .addField("Source:", json.permalink)
        .addField("Example:", json.example)

        .setFooter(`Written by ${json.author}`)
        

        message.channel.send({embed})
    })
  }
  
  if(cmd === `${prefix}addrole`){

    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Sorry pal, you can't do that.");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Couldn't find that user.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Specify a role!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Couldn't find that role.");

  if(rMember.roles.has(gRole.id)) return message.reply("They already have that role.");
  await(rMember.addRole(gRole.id));

  try{
    await rMember.send(`Congrats, you have been given the role ${gRole.name}`)
  }catch(e){
    message.channel.send(`Congrats to <@${rMember.id}>, they have been given the role ${gRole.name}. We tried to DM them, but their DMs are locked.`)
  }
    message.delete().catch(O_o=>{});
  }
  
  if(cmd === `${prefix}invite`){
    
    message.delete().catch(O_o=>{});
    message.channel.send(`Check Your DM's ${message.author}📬`)
    message.author.send("https://discord.gg/rSR6RAW")
  }
  
  
  
  if(cmd === `${prefix}help`){
 let hembed = new Discord.RichEmbed()
    
    .setTitle("Help")
    .addField("Tempmute", "just a simple moderation command (requires channel called incidents)")
    .addField("Serverinfo", "incase you want newcomers to know about your server")
    .addField("ban", "to permanantly ban someone from your server (requires channel called incidents)")
    .addField("botinfo", "just incase you want other people to know about our bot ")
    .addField("clear", "just a simple method to stop spam along with the temp mute command (requires channel called incidents)")
    .addField("report", "just so the owner know any problem occouring (requires channel called incidents)")
    .addField("kick", "to kick anyone who anoys you too much(requires channel called incidents)")
    .addField("add/remove role")
    .addField("doggo", "to see pictures of cute dogs")
    .addField("Color", "To add color to peoples roles")
    .addField("Colors", "To see options towards Color (ps: if you want to add colors you have to start it with # and give it your personal color and personal name)")
    .addField("8ball", "TO SEE DA FUTURE")
    .addField("invite", "to create an invite for people who need it")
    .addField("Level","To see your current level")
    .setColor("#ce1f0c")

    message.channel.send(`${message.author},:mailbox_with_mail: check your private messages`)
    message.author.send("https://discord.gg/rSR6RAW")
    message.author.send(hembed)
}
  if(cmd === `${prefix}botinfo`){

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Bot Creater", "𐍃P𐍈𐍈𐌊𐍅 ᐯᗴᖇ𐍃Ꭵᗝᑎ ṒḞ ϻŘ ƤẸƝƓǗ#5063")
    .addField("Created On", bot.user.createdAt);

    return message.channel.send(botembed);
  }
  



  
  if(cmd === `${prefix}urban`){
    if(args.length < 1) return message.channel.send("Please specify what to search")
    let str = args.join(" ")
    urban(str).first(json => {
        if(!json) return message.channel.send("No results found")
        
        let embed = new Discord.RichEmbed()
        .setTitle(json.word)
        .setDescription(json.definition)
        .addField(":thumbsup:", json.thumbs_up, true)
        .addField(":thumbsdown:", json.thumbs_down, true)
        .addField("Source:", json.permalink)

        .setFooter(`Written by ${json.author}`)
        

        message.channel.send({embed})
    })
  }
  if(cmd === `${prefix}say`){
    const sayMessage = args.join(" ");
      message.delete().catch();
      message.channel.send(sayMessage);
  }
  
  
  if(cmd === `${prefix}tempmute`){
     if(!message.member.roles.has(llama.id)) return message.reply("No can do. You need level 301");
  if(args[0] == "help"){
    message.reply("Usage: !tempmute <user> <1s/m/h/d>");
    return;
  }
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Couldn't find user.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
  let reason = args.slice(2).join(" ");
  if(!reason) return message.reply("Please supply a reason.");

  let muterole = message.guild.roles.find(`name`, "muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("You didn't specify a time!");

  message.delete().catch(O_o=>{});

  try{
    await tomute.send(`Hi! You've been muted for ${mutetime} by ${message.author}. Sorry!`)
  }catch(e){
    message.channel.send(`A user has been muted... but their DMs are locked. They will be muted for ${mutetime}`)
  }

  let muteembed = new Discord.RichEmbed()
  .setDescription(`Mute executed by ${message.author}`)
  .setColor("#ff0000")
  .addField("Muted User", tomute)
  .addField("Muted in", message.channel)
  .addField("Time", message.createdAt)
  .addField("Length", mutetime)
  .addField("Reason", reason);

  let incidentschannel = message.guild.channels.find(`name`, "incidents");
  if(!incidentschannel) return message.reply("Please create a incidents channel first!");
  incidentschannel.send(muteembed);

  await(tomute.addRole(muterole.id));

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, ms(mutetime));


//end of module
}

})

let token = process.env.token

bot.login(token);
