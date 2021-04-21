const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

let kayıtçı = db.fetch(`kayıtçırol_${message.guild.id}`)
let member = message.mentions.members.first();
if (!member) return message.channel.send(`Kayıtçı Rolü Vereceğiniz Kullanıcıyı Belirtiniz ! `)

message.guild.member(member).roles.remove(kayıtçı)
const ayarlandı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(`${client.user.username} - Kayıtçı Rolü Verildi `)
.setColor('BLACK')
.setDescription(`${member} Adlı Kullanıcıdan Kayıtçı Rolü Alındı ! `)
.setThumbnail(client.user.avatarURL())
.setFooter(`${message.author.username} Tarafından İstendi`, message.author.avatarURL())
message.channel.send(ayarlandı)
 db.delete(`kayıtsayı_${member.id}`) 
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['kayıtçıal'],
  permlevel: 0
}
exports.help = {
  name: 'kayıtçı-al',
  description: 'kayıtçı rolü verir',
  usage: '!kayıtçı-ver @kullanıcı'
}