import { Command } from '@sapphire/framework';
import { Colors, EmbedBuilder, Message } from 'discord.js';
import { parseFeed } from '../rss.mjs'; // Assuming fetchFeed is the function to parse the RSS feed

export class FetchCommand extends Command {
  constructor(context, options) {
    super(context, {
      ...options,
      name: 'parsefeed',
      aliases: ['rss'],
      description: 'Parses an RSS feed and sends updates to a channel',
      requiredUserPermissions: ['ManageGuild']
    });
  }

  /**
   * @param {Message} message 
   * @returns 
   */
  async messageRun(message) {
    parseFeed();
    message.reply('The RSS feeds should now be up to date.');
  }
}