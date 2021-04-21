const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
let talkedRecently = new Set();
module.exports = async message => {
if(message.author.bot) return

  if (talkedRecently.has(message.author.id)) {
    return;
  }
  talkedRecently.add(message.author.id);
    setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 2500);
  let client = message.client;
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    const emoji = ["✅"];
let koçovalı = db.fetch(`kural_${message.author.id}`);
if (koçovalı === null)
return message.channel
      .send(
        new Discord.MessageEmbed()
        .setColor('RED')
          .setDescription(` ✅ Basarak Botu Kullanabilirsni `)
          .setFooter(`Dost•Bot`)
          .setTimestamp())

.then(async function(embed) {
  const emoji = ["✅"];
  const filter = (reaction, user) =>
  emoji.includes(reaction.emoji.name) && user.id === message.author.id;
  await embed.react(emoji[0]).catch(function() {});

  var reactions = embed.createReactionCollector(filter);
  reactions.on("collect", async function(reaction) {
    if (reaction.emoji.name === "✅") {
      await embed.reactions.removeAll();
      await db.set(`kural_${message.author.id}`, "nul");
      return embed.edit(
        new Discord.MessageEmbed()
          .setColor(RED)
          .setDescription(`Botu Kullanbilirsin`)
      );
    }
  });
});
  let bakım = await db.fetch('bakım');
  if(message.author.id !== ayarlar.sahip){
  if(bakım){
  return message.channel.send(`**<a:ne:735209403430600795> Sizlere En İyi Hizmeti Verebilmek İçin Bakımdayız.\n Bakım Sebebi: \`${bakım}\`\n<a:ping:739533577481355315> Lütfen Daha Sonra Tekrar Deneyin.**`)
     }
    }
	let karaliste = db.fetch(`karalist_${message.author.id}`, "aktif")
        let karalistesebep = db.fetch(`sebep_${message.author.id}`)
        if (karaliste == "aktif") {
   let karaliste = new Discord.MessageEmbed()
    .setColor("0x36393F")
   .setTitle('KOMUTLARI KULLANAMAZSINIZ!')
  .setDescription(`Üzgünüm ancak komutları kullanamazsınız! Kurucularımız tarafından **${karalistesebep}** sebebiyle komutları kullanmanız yasaklandı!.`)
   .setFooter(`Dost•Bot engellendiniz.`)
   .setThumbnail(client.user.avatarURL())
   
   const embed = new Discord.MessageEmbed()
   .setColor("BLUE")
   .setTimestamp()
   .setFooter(`Dost•Bot`)
   .setDescription("**"+message.author.tag+"** adlı kullanıcı karalistede olup **"+command+"** adlı komutu: **"+message.guild.name+"** sunucusunda kullanmayı denedi.")
   client.channels.cache.get("783331262224007219").send(embed)
  return message.channel.send(karaliste)

        }
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
};