import { Command } from '@sapphire/framework';
import { EmbedBuilder, Message } from 'discord.js';

export class FetchCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      name: 'announce',
      aliases: ['post'],
      description: 'Announce a message in the custard bots channel',
      requiredUserPermissions: ['ManageGuild']
    });
  }

  /**
   * @param {Message} message 
   * @returns 
   */
  async messageRun(message, args) {
    const embed = new EmbedBuilder()
      .setColor(Colors.Blue)
      .setTitle('<:phoenixInfo:1279305980248850516> ' + await args.pick('string').catch(() => 'Announcement'))
      .setDescription(await args.rest('string'))
      .setTimestamp()
      .setFooter({ text: `Announcement by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });

    message.guild.channels.cache.get('1251238477484396575').send({
      embeds: [embed],
      allowedMentions: { parse: [] } // Prevents pinging the author
    }).catch(error => {
      this.container.logger.error('Error sending announcement:', error);
      return message.reply('An error occurred while sending the announcement. Please try again later.');
    });
    return message.reply('Announcement sent successfully!');
  }
}