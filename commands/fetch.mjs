import { Command } from '@sapphire/framework';
import { Message } from 'discord.js';

export class FetchCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      name: 'fetch',
      aliases: ['uptime'],
      description: 'Fetch the uptime of the custard bots'
    });
  }

  /**
   * @param {Message} message 
   * @returns 
   */
  async messageRun(message) {
    const msg = await message.reply('Please wait...');
    const custardguild = await this.container.client.guilds.fetch('1251025316701405284');
    if (!custardguild) {
      return msg.edit('Failed to fetch the guild. Please try again later.');
    }

    const bots = await custardguild.members.fetch({ user: ['1171286616967479377', '1227318291475730443', '1341574214821609655', '1294168545965379584'], withPresences: true })
    .catch(error => {
      this.container.logger.error('Error fetching bots:', error);
      return msg.edit('An error occurred while fetching the bots. Please try again later.');
    });
    if (!bots) return;

    if (bots.size === 0) {
      return msg.edit('No bots found in the guild.');
    }

    msg.edit({
        content: `### Uptime of Custard Bots:\n${bots.map(bot => `${bot.user.username}: ${bot.presence?.status ? `<:phoenixSuccess:1279305979028308082> **${bot.presence?.status}**` : '<:phoenixError:1279305981834035221> **offline**'}`).join('\n')}`,
        allowedMentions: { parse: [] } // Prevents pinging the bots
    });
  }
}