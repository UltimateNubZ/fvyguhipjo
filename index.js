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
  
