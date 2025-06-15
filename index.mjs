// Initialize environment variables
import dotenv from 'dotenv'; // Load environment variables from .env file
dotenv.config(); // Load environment variables from .env file

import { SapphireClient } from '@sapphire/framework'; // Import necessary modules from Sapphire framework
import { GatewayIntentBits } from 'discord.js'; // Import necessary modules from discord.js and Sapphire framework

import '@sapphire/plugin-hmr/register'; // Hot Module Replacement for development
import '@sapphire/plugin-logger/register'; // Logger plugin for better logging


const client = new SapphireClient({
    intents: [
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    defaultPrefix: 'k!',
    caseInsensitiveCommands: true,
    loadMessageCommandListeners: true,
    loadDefaultErrorListeners: true
});

client.login(process.env.TOKEN).catch((error) => {
  console.error('Failed to login:', error);
  process.exit(1);
});