import { httpsPost } from "./util/axios";

// Chat-GPT documentation: https://platform.openai.com/docs/guides/chat/introduction
export const ask = async (prompt: string) => {
    console.log("Sending payload to OpenAI.");

    // Two models work on this API endpoint: gpt-4 and gpt-3.5-turbo. Uncomment the one you want to use.
    const payload = {
        // model: "gpt-4",
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system", // The "Primer" prompt.
                content: "You are an AI chatting in a Discord server with humans. Be as helpful as you can possibly be.",
            },
            {
                role: "user",
                content: prompt
            }
        ]
    }

    const resp = await httpsPost("api.openai.com/v1/chat/completions", payload, process.env.OPENAI_API_KEY);
    if (!resp) throw new Error("No response from OpenAI.");

    console.log(resp.choices[0].message.content);
}