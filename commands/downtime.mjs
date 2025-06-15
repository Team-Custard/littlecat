import { Command } from '@sapphire/framework';
import { Colors, EmbedBuilder, Message } from 'discord.js';

export class FetchCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      name: 'issue',
      aliases: ['isser', 'downtime'],
      description: 'Announce an issue in the custard bots channel',
      requiredUserPermissions: ['ManageGuild']
    });
  }

  /**
   * @param {Message} message 
   * @returns 
   */
  async messageRun(message, args) {
    const embed = new EmbedBuilder()
      .setColor(Colors.Yellow)
      .setTitle(`<:phoenixWarning:1279305977371562076> ` + await args.pick('string').catch(() => 'Issue'))
      .setDescription(await args.rest('string'))
      .setTimestamp()
      .setFooter({ text: `Issue reported by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });

    message.guild.channels.cache.get('1251238477484396575').send({
      embeds: [embed],
      allowedMentions: { parse: [] } // Prevents pinging the author
    }).catch(error => {
      this.container.logger.error('Error sending issue report:', error);
      return message.reply('An error occurred while sending the issue report. Please try again later.');
    });
    return message.reply('Issue report sent successfully!');
  }
}