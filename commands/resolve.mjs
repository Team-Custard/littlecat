import { Command } from '@sapphire/framework';
import { Colors, EmbedBuilder, Message } from 'discord.js';

export class FetchCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      name: 'resolve',
      aliases: ['resolver'],
      description: 'Resolves an issue in the custard bots channel',
      requiredUserPermissions: ['ManageGuild']
    });
  }

  /**
   * @param {Message} message 
   * @returns 
   */
  async messageRun(message, args) {
    const messageid = await args.pick('string').catch(() => null);
    if (!messageid) {
      return message.reply('Please provide a valid message ID to resolve.');
    }
    const targetMessage = await message.guild.channels.cache.get('1251238477484396575').messages.fetch(messageid).catch(() => null);
    if (!targetMessage) {
      return message.reply('Could not find a message with that ID in the issues channel.');
    }
    const embed = new EmbedBuilder(targetMessage.embeds[0])
      .setColor(Colors.Green)
      .addFields({
        name: '<:phoenixSuccess:1279305979028308082> Resolved',
        value: await args.rest('string').catch(() => 'Issue has been resolved.'),
        inline: true
    });
    targetMessage.edit({
      embeds: [embed],
      allowedMentions: { parse: [] } // Prevents pinging the author
    }).catch(error => {
      this.container.logger.error('Error resolving issue:', error);
      return message.reply('An error occurred while resolving the issue. Please try again later.');
    });
    return message.reply('Issue report updated successfully!');
  }
}