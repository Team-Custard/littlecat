import { Listener } from '@sapphire/framework';

export class ShutdownListener extends Listener {
  constructor(context, options) {
    super(context, {
      ...options,
      once: true,
      emitter: process,
      event: 'SIGINT'
    });
  }

  run() {
    this.container.logger.info('Received shutdown signal. Shutting down gracefully...');
    this.container.client.destroy().catch((error) => {
      this.container.logger.error('Error during shutdown:', error);
    });
    this.container.logger.info('Client disconnected. Exiting process...');
    // Optionally, you can add a delay here to ensure all cleanup is done before exiting
    setTimeout(() => {
      process.exit(0);
    }, 1000); // Wait for 1 second before exiting
  }
}