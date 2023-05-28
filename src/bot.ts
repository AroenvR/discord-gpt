import { Client, GatewayIntentBits, Events, Message } from 'discord.js';

export const startBot = async () => {
    console.log("Starting bot...");

    const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

    client.on("ready", () => {
        console.log("Bot is online.");
    });

    client.on(Events.MessageCreate, async (message: Message) => {
        console.log(message.content);

        // Ensure bots don't reply to other bots.
        if (message.author.bot) return;

        if (message.content.substring(0, 1) === "!") {
            message.channel.send("Hello from AI bot"); // reply if message has "!" as first character
        }
    });

    client.login(process.env.TOKEN);
}