import { Client, GatewayIntentBits, Events, Message } from 'discord.js';
import { promptGpt } from '../openai/gpt';

// Check out https://discordjs.guide/creating-your-bot/slash-commands.html#individual-command-files for more info on creating bots.

/**
 * Start the Discord bot.
 */
export const startBot = async () => {
    console.log("Starting bot...");
    const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

    client.on("ready", () => {
        console.log("Bot is online.");
    });

    // Handle message events.
    client.on(Events.MessageCreate, async (message: Message) => {
        console.log("User input received.");

        if (message.author.bot) return; // Ensure bots don't reply to other bots.
        if (!message.content.startsWith(process.env.OPTONNANI_TAG!)) return; // reply if message has "!" as first character.

        const prompt = message.content.replace(`${process.env.OPTONNANI_TAG!} `, "");
        console.log(`Received message: ${prompt}`);

        const gptResponse = await promptGpt(prompt);

        let chunks = await splitMessage(gptResponse); // Discord has a 2000 character limit per message.
        chunks.forEach((chunk: string) => {
            message.channel.send(chunk);
        });

    });

    client.login(process.env.TOKEN);
}

/**
 * Split a message into chunks of 1999 characters or less.
 * @param message to split.
 * @returns array of chunks.
 */
const splitMessage = async (message: string): Promise<string[]> => {
    const maxLength = 1999;
    let chunks: string[] = [];

    if (message.length <= maxLength) {
        chunks.push(message);
    } else {
        while (message.length > 0) {
            let chunk = message.slice(0, maxLength);
            chunks.push(chunk);
            message = message.slice(maxLength);
        }
    }

    return chunks;
}