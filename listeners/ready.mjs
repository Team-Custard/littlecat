import { Listener } from '@sapphire/framework';
import { parseFeed } from '../rss.mjs'; // Assuming fetchFeed is the function to parse the RSS feed

export class ReadyListener extends Listener {
  constructor(context, options) {
    super(context, {
      ...options,
      once: true,
      event: 'ready'
    });
  }

  /**
   * Runs when the client is ready.
   * @param {import('@sapphire/framework').SapphireClient} client - The client instance.
   */
  async run(client) {

    const { username, id } = client.user;
    this.container.logger.info(`Successfully logged in as ${username} (${id})`);
    client.user.setPresence({
      activities: [{ name: 'with my yarn ball', type: 'PLAYING' },
        { name: 'my owner code', type: 'WATCHING' },
        { name: 'the world', type: 'LISTENING' },
        { name: 'support questions', type: 'LISTENING' },
        { name: 'you', type: 'WATCHING' }
      ],
      status: 'online'
    });
  }
}