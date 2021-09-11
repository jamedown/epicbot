const Discord = require("discord.js");
const client = new Discord.Client();
const moment = require("moment");
const { token, prefix } = require(`./config.json`);

client.on("ready", () => {
	client.user.setActivity(`${prefix}help`)
	console.log(`
	============
	Name: ${client.user.username}
	Prefix: ${prefix}
	ping: ${client.ws.ping}
	Bot is On
	============
	`)
	
})




/////help
client.on("message", message => {
	if(message.content === (prefix + "help")) {
		let embedx3 = new Discord.MessageEmbed()
		.setColor(`BLUE`)
		.setTitle(`${message.guild.name}`)
		.setThumbnail(`${client.user.displayAvatarURL()}`)
		.addField(`**1️⃣ User Info :**`, `**\`${prefix}user\`**`, true)
        .addField(`**2️⃣ User id :**`, `**\`${prefix}id\`**`, true)
		.addField(`**3️⃣ User Avatar :**`, `**\`${prefix}avatar\`**`, true)
        .addField(`**4️⃣ Server Info :**`, `**\`${prefix}server\`**`, true)
        .addField(`**5️⃣ Server Logo :**`, `**\`${prefix}logo\`**`, true)
        .addField(`**6️⃣ Server Emojis :**`, `**\`${prefix}emojis\`**`, true)
        .addField(`**7️⃣ Server Boost :**`, `**\`${prefix}boost\`**`, true)
        .addField(`**8️⃣ Bot Info :**`, `**\`${prefix}bot\`**`, true)
        .addField(`**9️⃣ Bot Ping :**`, `**\`${prefix}ping\`**`, true)
        .addField(`***️⃣ Members Count :**`, `**\`${prefix}memc\`**`, true)
        .addField(`***️⃣ Show Bans :**`, `**\`${prefix}sbans\`**`, true)
        .addField(`***️⃣ Guilds :**`, `**\`${prefix}guilds\`**`, true)
			message.channel.send(embedx3)
	}
	
})






//////connect-id-Channel
client.on("message", msg => {
    if (msg.content.startsWith(prefix + "connect")) {
     
       if (!msg.member.hasPermission("ADMINISTRATOR"))
        return msg.channel.send("*You Don't Have Permission!**");
       let args = msg.content.split(" ").slice(1);
      if (!args[0])
        return msg.reply(
          `**id ?**`
        );
      let c = client.channels.cache.get(`${args}`);// id channel
  if(c.type === 'voice') { 
  c.join().catch(err => {
              message.reply(`**404 Not Found**`);
              console.error(err);
              });
  
      msg.reply(`**Connected, i am in.\n <#${args}>**`)
      
               }
    }
  });




/////Show-Bans
    client.on('message', message => {
    if (message.content.startsWith(prefix + "sbans")) {
      if (!message.channel.guild) return;
      message.channel
      message.guild.fetchBans()
        .then(bans => message.channel.send(`:small_orange_diamond: **Server Ban List :** ${bans.size} `))
        .catch(console.error);
    }
  });





/////user

client.on('message', message =>{

	if (message.content.startsWith(prefix + "user")) {
		var args = message.content.split(" ").slice(1);
		let mention = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
	  var user = message.mentions.users.first() || message.author; 
	  if(!mention) mention = message.member;
const userFlags = mention.user.flags.toArray();

	  var embed = new Discord.MessageEmbed()
	  .setColor(`RANDOM`)

	  .setTitle(`**User Info**`)

	  .setDescription(`**
	  📛 User Name : \`${user.username}\`

	  #️⃣ Discriminator : \`#${mention.user.discriminator}\`

	  🆔 User ID : \`${user.id}\`
	  	
	  ➡️ Join Server : \`${moment(user.joinedAt).format('YYYY/M/D')}\` 
	
	  ⬅️ Join Discord : \`${moment(user.createdTimestamp).format('YYYY/M/D')}\` 
	  
	  
	  **`)

	  .setThumbnail(`${mention.user.displayAvatarURL()}`)
	    
	
	  message.channel.send(embed)
	
	
	
	}
	});




/////avatar
client.on("message", message => {
	if(message.content.startsWith(prefix + "avatar")) {
		  var args = message.content.split(" ").slice(1);
		let ava = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!ava) ava = message.member;
  let avatar = ava.user.avatarURL({dynamic: true, size: 4096, format: `png`})
		let embedx3 = new Discord.MessageEmbed()
		.setColor(`RANDOM`)
		.setTitle(`**${ava.user.tag}**`)
        .setDescription(`[**Avatar Link**](${avatar})`)
        .setImage(avatar);

message.channel.send(embedx3)
		
	}
})




/////ping
client.on("message", message => {
	if(message.content === (prefix + "ping")) {
	message.channel.send("pong!").then(message => message.edit(`\`\`\`js
Time Taken: ${client.ws.ping} ms
Discord API: ${Date.now() - message.createdTimestamp} ms
\`\`\``))
	}
})




//////emojies
client.on("message", message => {
    if (message.content.toLowerCase() === prefix + "emojis") {
      let emojis = message.guild.emojis.cache.map(e => ` ${e}`).join("\n");
      let embed = new Discord.MessageEmbed()
	  .setColor(`RANDOM`)
      .setTitle("**Server Emojis**")
      .setDescription(emojis);
      message.channel.send(embed);
    }
  });

  

  
/////SERVER


const verificationLevels = {
	NONE: 'None',
	LOW: 'Low',
	MEDIUM: 'Medium',
	HIGH: 'High',
	VERY_HIGH: 'Highest'
};

client.on("message", message => {
	if(message.content.startsWith(prefix + "server")) {

                  const roles = message.guild.roles.cache.size
				  const text = message.guild.channels.cache.filter(r => r.type === "text").size
				  const voice = message.guild.channels.cache.filter(r => r.type === "voice").size


    	let embedx3 = new Discord.MessageEmbed()

    	.setColor(`RANDOM`)
    	.setTitle(`**${message.guild.name}**`)
		.addField(`**👑 Owned By**`, `${message.guild.owner}`, true)
    	.addField(`**📆 Created On**`, `\`${message.guild.createdAt.toLocaleString()}\`
		\`${moment(message.guild.createdTimestamp).fromNow()}\``, true)
		.addField(`**🆔 Server id**`, `\`${message.guild.id}\``, true)
        .addField(`**👥 Members Count**`, `\`${message.guild.memberCount}\``, true)
	    .addField(`**💬 Channels Count**`, `\`${text} Text | ${voice} Voice\``, true)
        .addField(`**✨ Roles Count**`, `\`${roles}\``, true)
	    .addField(`**🌡️ Boost Count**`, `\`${message.guild.premiumSubscriptionCount || '0'}\``, true)
	    .addField(`**🔥 Boost Lvl**`, `\`${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}\``, true)
	    .addField(`**🔐 Verification Level**`, `\`${verificationLevels[message.guild.verificationLevel]}\``, true)
	    .addField(`**🗺️ Server Region**`, `\`${message.guild.region}\``, true)

message.channel.send(embedx3)

	}
})




/////logo
client.on("message", message => {
	if(message.content.startsWith(prefix + "logo")) {
		  var args = message.content.split(" ").slice(1);
		let ava = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!ava) ava = message.member;
  let avatar = ava.guild.iconURL({dynamic: true, size: 4096, format: `png`})
		let embedx3 = new Discord.MessageEmbed()
		.setColor(`RANDOM`)
		.setTitle(`**${ava.guild.name}**`)
        .setDescription(`[**Logo Link**](${avatar})`)
        .setImage(avatar);

message.channel.send(embedx3)
		
	}
})



////bot
client.on("message", message => {
	if(message.content === (prefix + "bot")) {
		let embedx3 = new Discord.MessageEmbed()			
		.setColor(`RANDOM`)
		.setThumbnail(`${client.user.displayAvatarURL()}`)
		.addField(`Username:`, `**\`${client.user.username}\`**`, true)
		.addField(`id`, `**\`${client.user.id}\`**`, true)
		.addField(`Discriminator:`, `**\`#${client.user.discriminator}\`**`, true)
		.addField(`Status:`, `**\`${client.user.presence.status}\`**`, true)
		.addField(`JOINED DISCORD:`, `**\`${moment(client.createdAt).format('DD/MM/YYYY')}\`**`, true)
		.addField(`JOINED SERVER:`, `**\`${moment(client.joinedAt).format('DD/MM/YYYY')}\`**`, true)
		.setFooter(`${message.author.username}#${message.author.discriminator}`)
		    message.channel.send(embedx3)
	}
})



/////id
client.on("message", message => {
	if(message.content.startsWith(prefix + "id")) {
		  var args = message.content.split(" ").slice(1);
		let mention = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!mention) mention = message.member;
const userFlags = mention.user.flags.toArray();

let embedx3 = new Discord.MessageEmbed()
		.setColor(`RANDOM`)
		.setThumbnail(`${mention.user.displayAvatarURL()}`)
		.setTitle(`**${mention.user.username}**`)
        .addField(`User ID`, `**\`${mention.user.id}\`**`, true)
        .addField(`Username`, `**\`${mention.user.username}\`**`, true)
		.addField(`Discriminator:`, `**\`#${mention.user.discriminator}\`**`, true)
		.setFooter(`${message.author.username}#${message.author.discriminator}`)
			message.channel.send(embedx3)
				
		}
})



/////members-count
client.on("message", message => {
	if(message.content === (prefix + "memc")) {
		
		let embedx3 = new Discord.MessageEmbed()
		.setColor(`RANDOM`)
		.addField(`Members Count`, `${message.guild.memberCount}`, true)
		    message.channel.send(embedx3)
	}
})


  

//guilds

client.on('message',function(message) {
	if(message.content.startsWith(prefix + "guilds")) {
		message.channel.send(`Guilds: \`\`${client.guilds.cache.size}\`\``);
	} 
 });

  


//boost and level

client.on('message', badboy => {
	if(badboy.content.startsWith(prefix + "boost")){
	  
   if(badboy.author.bot || !badboy.guild) return badboy.reply("this command for server only")
   
	  
	  let level = badboy.guild.premiumTier === 0 ? "No Level" : `${badboy.guild.premiumTier}`;
   
	  let boost = badboy.guild.premiumSubscriptionCount;
	  
	  
	  
	  let embed = new Discord.MessageEmbed()
	  .setTitle(`Boost of ${badboy.guild.name}`)
  
  .addField("Boost", `${boost}`)
  .addField("Level", `${level}`)
  .setColor("PURPLE")
   
   badboy.channel.send(embed)
   
	}
  });






/////FUN-Help
client.on("message", message => {
	if(message.content === (prefix + "fun")) {
		let embedx3 = new Discord.MessageEmbed()
		.setColor(`BLUE`)
		.setTitle(`${message.guild.name}`)
		.setThumbnail(`${client.user.displayAvatarURL()}`)
		.addField(`**🙋‍♂️ Spank :**`, `**\`${prefix}spank\`**`, true)
        .addField(`**💋 Kiss :**`, `**\`${prefix}kiss\`**`, true)
        .addField(`**✂️ Delete :**`, `**\`${prefix}delete\`**`, true)
        .addField(`**🗑️ Trash :**`, `**\`${prefix}trash\`**`, true)
        .addField(`**👋 Slap :**`, `**\`${prefix}slap\`**`, true)
        .addField(`**🏴󠁴󠁬󠁤󠁩󠁿 Rip :**`, `**\`${prefix}rip\`**`, true)
        .addField(`**🌈 Gay :**`, `**\`${prefix}gay\`**`, true)
        .addField(`**📜 Wanted :**`, `**\`${prefix}wanted\`**`, true)
        .addField(`**🖼️ Invert :**`, `**\`${prefix}invert\`**`, true)
        .addField(`**🖼️ Sepia :**`, `**\`${prefix}sepia\`**`, true)
        .addField(`**👁️‍🗨️ Ad :**`, `**\`${prefix}ad\`**`, true)
        .addField(`**💀 Affect :**`, `**\`${prefix}affect\`**`, true)
        .addField(`**🥚 MMs :**`, `**\`${prefix}mms\`**`, true)
        .addField(`**✨ Beautiful :**`, `**\`${prefix}beautiful\`**`, true)
        .addField(`**🖍️ Bobross :**`, `**\`${prefix}bobross\`**`, true)
        .addField(`**🖤 Discord-Black :**`, `**\`${prefix}discordblack\`**`, true)
        .addField(`**💙 Discord-Blue :**`, `**\`${prefix}discordblue\`**`, true)
        .addField(`**🤦‍♂️ Facepalm :**`, `**\`${prefix}facepalm\`**`, true)
        .addField(`**👺 Hitler :**`, `**\`${prefix}hitler\`**`, true)
        .addField(`**🚓 Jail :**`, `**\`${prefix}jail\`**`, true)
        .addField(`**👧 Karaba :**`, `**\`${prefix}karaba\`**`, true)
        .addField(`**🔻 Triggered :**`, `**\`${prefix}triggered\`**`, true)
        .addField(`**⏺️ Blur :**`, `**\`${prefix}blur\`**`, true)
        .addField(`**↗️ stonk :**`, `**\`${prefix}stonk\`**`, true)
        .addField(`**↙️ Not Stonk :**`, `**\`${prefix}notstonk\`**`, true)
        .addField(`**👯 Double Stonk :**`, `**\`${prefix}dstonk\`**`, true)
		message.channel.send(embedx3)
	}
	
})

///FUN-COMMANDS

/////Spank
const DIG = require("discord-image-generation");
client.on("message", async (message) => {
    if (message.content.startsWith(prefix + "spank")) {
              let user = message.mentions.users.first();
                            if(!user) return message.reply("need mention user")

        let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        const avatar2 = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let img = await new DIG.Spank().getImage(`${avatar}`, `${avatar2}`);
        let attach = new Discord.MessageAttachment(img, "Spank.png");;
        message.channel.send(attach)
    }
});



/////Kiss
client.on("message", async (message) => {
    if (message.content.startsWith(prefix + "kiss")) {
              let user = message.mentions.users.first();
                            if(!user) return message.reply("need mention user")

        let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        const avatar2 = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let img = await new DIG.Kiss().getImage(`${avatar}`, `${avatar2}`);
        let attach = new Discord.MessageAttachment(img, "Kiss.png");;
        message.channel.send(attach)
    }
});


////Stonk
client.on("message", async (message) => {
    if (message.content.startsWith(prefix + "stonk")) {

        let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        let img = await new DIG.Stonk().getImage(avatar)
        let attach = new Discord.MessageAttachment(img, "Stonk.png");;
        message.channel.send(attach)
    }
});


////NotStonk
client.on("message", async (message) => {
    if (message.content.startsWith(prefix + "notstonk")) {

        let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        let img = await new DIG.NotStonk().getImage(avatar)
        let attach = new Discord.MessageAttachment(img, "NotStonk.png");;
        message.channel.send(attach)
    }
});




/////Invert
client.on("message", async (message) => {
    if (message.content.startsWith(prefix + "invert")) {

        let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        let img = await new DIG.Invert().getImage(avatar)
        let attach = new Discord.MessageAttachment(img, "Invert.png");;
        message.channel.send(attach)
    }
});


////Mms
client.on("message", async (message) => {
    if (message.content.startsWith(prefix + "mms")) {

        let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        let img = await new DIG.Mms().getImage(avatar)
        let attach = new Discord.MessageAttachment(img, "Mms.png");;
        message.channel.send(attach)
    }
});


/////Sepia
client.on("message", async (message) => {
    if (message.content.startsWith(prefix + "sepia")) {

        let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        let img = await new DIG.Sepia().getImage(avatar)
        let attach = new Discord.MessageAttachment(img, "Sepia.png");;
        message.channel.send(attach)
    }
});





/////Ad
client.on("message", async (message) => {
    if (message.content.startsWith(prefix + "ad")) {

        let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        let img = await new DIG.Ad().getImage(avatar)
        let attach = new Discord.MessageAttachment(img, "Ad.png");;
        message.channel.send(attach)
    }
});



/////Affect
client.on("message", async (message) => {
    if (message.content.startsWith(prefix + "affect")) {

        let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        let img = await new DIG.Affect().getImage(avatar)
        let attach = new Discord.MessageAttachment(img, "Affect.png");;
        message.channel.send(attach)
    }
});


/////Beautiful
client.on("message", async (message) => {
    if (message.content.startsWith(prefix + "beautiful")) {

        let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        let img = await new DIG.Beautiful().getImage(avatar)
        let attach = new Discord.MessageAttachment(img, "Beautiful.png");;
        message.channel.send(attach)
    }
});



/////Bobross
client.on("message", async (message) => {
    if (message.content.startsWith(prefix + "bobross")) {

        let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        let img = await new DIG.Bobross().getImage(avatar)
        let attach = new Discord.MessageAttachment(img, "Bobross.png");;
        message.channel.send(attach)
    }
});




/////DiscordBlack
client.on("message", async (message) => {
    if (message.content.startsWith(prefix + "discordblack")) {

        let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        let img = await new DIG.DiscordBlack().getImage(avatar)
        let attach = new Discord.MessageAttachment(img, "DiscordBlack.png");;
        message.channel.send(attach)
    }
});


/////DiscordBlue
client.on("message", async (message) => {
    if (message.content.startsWith(prefix + "discordblue")) {

        let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        let img = await new DIG.DiscordBlue().getImage(avatar)
        let attach = new Discord.MessageAttachment(img, "DiscordBlue.png");;
        message.channel.send(attach)
    }
});



/////Facepalm
client.on("message", async (message) => {
    if (message.content.startsWith(prefix + "facepalm")) {

        let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        let img = await new DIG.Facepalm().getImage(avatar)
        let attach = new Discord.MessageAttachment(img, "Facepalm.png");;
        message.channel.send(attach)
    }
});



/////Hitler
client.on("message", async (message) => {
    if (message.content.startsWith(prefix + "hitler")) {

        let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        let img = await new DIG.Hitler().getImage(avatar)
        let attach = new Discord.MessageAttachment(img, "Hitler.png");;
        message.channel.send(attach)
    }
});



/////Jail
client.on("message", async (message) => {
    if (message.content.startsWith(prefix + "jail")) {

        let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        let img = await new DIG.Jail().getImage(avatar)
        let attach = new Discord.MessageAttachment(img, "Jail.png");;
        message.channel.send(attach)
    }
});


/////Karaba
client.on("message", async (message) => {
    if (message.content.startsWith(prefix + "karaba")) {

        let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        let img = await new DIG.Karaba().getImage(avatar)
        let attach = new Discord.MessageAttachment(img, "Karaba.png");;
        message.channel.send(attach)
    }
});




/////DoubleStonk
client.on("message", async (message) => {
    if (message.content.startsWith(prefix + "dstonk")) {
              let user = message.mentions.users.first();
                            if(!user) return message.reply("need mention user")

        let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        const avatar2 = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let img = await new DIG.DoubleStonk().getImage(`${avatar}`, `${avatar2}`);
        let attach = new Discord.MessageAttachment(img, "DoubleStonk.png");;
        message.channel.send(attach)
    }
});




/////gay

client.on("message", async (message) => {
    if (message.content.startsWith(prefix + "gay")) {
              let user = message.mentions.users.first();
                            if(!user) return message.reply("need mention user")

        const avatar2 = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let img = await new DIG.Gay().getImage(`${avatar2}`);
        let attach = new Discord.MessageAttachment(img, "Gay.png");;
        message.channel.send(attach)
    }
});





//wanted

client.on("message", async (message) => {
    if (message.content.startsWith(prefix + "wanted")) {
              let user = message.mentions.users.first();
                            if(!user) return message.reply("need mention user")

        const avatar2 = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let img = await new DIG.Wanted().getImage(`${avatar2}`);
        let attach = new Discord.MessageAttachment(img, "Wanted.png");;
        message.channel.send(attach)
    }
});




//triggered

client.on("message", async (message) => {
    if(message.content.startsWith(prefix + "triggered")){
          var user = message.mentions.users.first() || message.author || message.guild.members.cache.get(message.content.split(' ')[1]);
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let img = await new DIG.Triggered().getImage(avatar)
        let attach = new Discord.MessageAttachment(img, "Triggered.gif");;
        message.channel.send(attach)
    }
});





//delete

client.on("message", async (message) => {
    if (message.content.startsWith(prefix + "delete")) {
              let user = message.mentions.users.first();
              if(!user) return message.reply("need mention user")
        let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        const avatar2 = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let img = await new DIG.Delete().getImage(`${avatar2}`);
        let attach = new Discord.MessageAttachment(img, "Delete.png");;
        message.channel.send(attach)
    }
});




//trash

client.on("message", async (message) => {
    if (message.content.startsWith(prefix + "trash")) {
              let user = message.mentions.users.first();
                            if(!user) return message.reply("need mention user")

        const avatar2 = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let img = await new DIG.Trash().getImage(`${avatar2}`);
        let attach = new Discord.MessageAttachment(img, "Trash.png");;
        message.channel.send(attach)
    }
});




//slap

client.on("message", async (message) => {
    if (message.content.startsWith(prefix + "slap")) {
              let user = message.mentions.users.first();
                            if(!user) return message.reply("need mention user")

        let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        const avatar2 = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let img = await new DIG.Batslap().getImage(`${avatar}`, `${avatar2}`);
        let attach = new Discord.MessageAttachment(img, "slap.png");;
        message.channel.send(attach)
    }
});




//blur

client.on("message", async (message) => {
    if (message.content.startsWith(prefix + "blur")) {
        var avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        let img = await new DIG.Blur().getImage(`${avatar}`,);
        let attach = new Discord.MessageAttachment(img, "Blur.png");;
        message.channel.send(attach)
    }
});





//rip

client.on("message", async (message) => {
    if (message.content.startsWith(prefix + "rip")) {
              let user = message.mentions.users.first();
                            if(!user) return message.reply("need mention user")

        const avatar2 = user.displayAvatarURL({ dynamic: false, format: 'png' });
        let img = await new DIG.Rip().getImage(`${avatar2}`);
        let attach = new Discord.MessageAttachment(img, "Ri.png");;
        message.channel.send(attach)
    }
});


client.login(token);