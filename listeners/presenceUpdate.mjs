import { Listener } from '@sapphire/framework';

export class PresenceUpdateListener extends Listener {
  constructor(context, options) {
    super(context, {
      ...options,
      once: false,
      event: 'presenceUpdate',
      name: 'presenceUpdate'
    });
  }

  /**
   * Runs when a guild member's presence is updated.
   * @param {import('discord.js').GuildMember} oldMember - The member before the update.
   * @param {import('discord.js').GuildMember} newMember - The member after the update.
   */
  async run(oldPresence, newPresence) {
    const validIds = ['1171286616967479377', '1227318291475730443', '1341574214821609655', '1294168545965379584'];
    // Check if the member is one of the specified bots
    if (!validIds.includes(newPresence.user.id)) return; //this.container.logger.info(`Presence update for non-monitored member: ${newPresence.user.tag} (${newPresence.user.id})`);

    if (oldPresence?.status !== newPresence?.status) {
      this.container.client.channels.cache.get('1251268439813914707').send(`<:phoenixInfo:1279305980248850516> **${newPresence.user.tag}**'s presence has changed to **${newPresence?.status || 'offline'}**.`);
    }
  }
}