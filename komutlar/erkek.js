const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

let kanal = db.fetch(`kayıtkanal_${message.guild.id}`)
let alınacakrol = db.fetch(`alınacakrol_${message.guild.id}`)
let erkekrol = db.fetch(`erkekrol_${message.guild.id}`)
let kayıtçı = db.fetch(`kayıtçırol_${message.guild.id}`)
let kayıtsayı = db.fetch(`kayıtsayı_${message.guild.id}`)
  
if(!message.member.roles.cache.has(kayıtçı)) return message.channel.send(`Bu Komudu Kullanabilmen İçin <@&${kayıtçı}> Adlı Role Sahip olman Lazım ! `)
if(message.channel.id !== kanal) return message.channel.send(`Bu Komudu Sadece <#${kanal}> Adlı Kanalda Kullanabilirsin ! `)
if (!erkekrol) return message.channel.send(`Sunucuda Erkek Rolü Ayarlanmadığı İçin Komut Kullanılamaz ! `)

let member = message.mentions.members.first();
if (!member) return message.channel.send(`Erkek Olarak Kayıt Edeceğin Kullanıcıyı Belirtmelisin ! `)
let isim = args[1]
if (!isim) return message.channel.send(`İsmini Belirtmelisin ! `)
let yaş = args[2]
if (!yaş) return message.channel.send(`Yaşını Belirtmelisin ! `)
member.setNickname(`${isim} | ${yaş}`)
message.guild.member(member).roles.remove(alınacakrol)
message.guild.member(member).roles.add(erkekrol) 

const başarılı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setTitle(``)
.setColor('BLACK')
.setDescription(`${member} **Adlı Kullanıcı** <@${message.author.id}> **Tarafından Kayıt Edildi** \n **İsmi** \`${isim} | ${yaş}\` **Olarak Değiştirildi** \n **Verilen Röl** <@&${erkekrol}> \n **Alınınan Röl** <@&${alınacakrol}> \n **Aramıza Hoş Gedlin** ${member} \n\n <@${message.author.id}> **Adlı Yetkilinin Toplam** **${kayıtsayı ? `**${kayıtsayı}**` : "0"}** __Kayıtı Oldu__`)
.setFooter(`Kuralları Okumayı Unutmayız`)
message.channel.send(başarılı)
db.add(`kayıtsayı_${message.guild.id}`, 1)
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['e'],
  permlevel: 0
}
exports.help = {
  name: 'erkek',
  description: 'erkek olarak kayıt eder',
  usage: '!erkek @kullanıcı isim yaş'
}