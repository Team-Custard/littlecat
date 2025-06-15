import Parser from "rss-parser";
import { container } from "@sapphire/framework";
import cron from 'node-cron';

let discordTimestamp = new Date(0); // Initialize to epoch time
let contaboTimestamp = new Date(0); // Initialize to epoch time
const parser = new Parser();

export async function parseFeed() {
    try {
        parser.parseURL("https://discordstatus.com/history.rss").then((feed) => {
            let embeds = [];
            const item = feed.items[0]; // Get the first item from the feed
            embeds.push({
                title: `<:rss:1383691531868962818> ` + item.title,
                description: item.contentSnippet,
                url: item.link,
                timestamp: new Date(item.pubDate),
                color: 0x00ff00 // Green color for success
            });

            if (new Date(item.pubDate) > discordTimestamp) {
                discordTimestamp = new Date(item.pubDate);
                container.client.channels.cache.get('1251238477484396575').send({ embeds });
            }
        }).catch((error) => {
            container.logger.error("Failed to parse Discord status RSS feed:", error);
        }
        );

        parser.parseURL("https://rss.app/feeds/Ll4kl1YC2EXCfPDk.xml").then((feed) => {
            let embeds = [];
            const item = feed.items[0]; // Get the first item from the feed
            embeds.push({
                title: `<:rss:1383691531868962818> ` + item.title,
                description: item.contentSnippet,
                url: item.link,
                timestamp: new Date(item.pubDate),
                color: 0x00ff00 // Green color for success
            });

            if (new Date(item.pubDate) > contaboTimestamp) {
                contaboTimestamp = new Date(item.pubDate);
                container.client.channels.cache.get('1251238477484396575').send({ embeds });
            }
        }).catch((error) => {
            container.logger.error("Failed to parse Contabo status RSS feed:", error);
        }
        );
        container.logger.info('RSS feed parsed successfully.');
         // Return 'ok' to indicate successful parsing
        
        return 'ok';
    } catch (error) {
        container.logger.error("Failed to parse RSS feed:", error);
        throw error;
    }
}

cron.schedule('* * * * *', () => {
  parseFeed();
});
container.logger.info('RSS feed parser started, checking every minute.');