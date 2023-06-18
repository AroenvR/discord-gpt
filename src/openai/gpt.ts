import { httpsPost } from "../util/axios";

/**
 * Prompt an OpenAI Chat model.
 * Chat-GPT documentation: https://platform.openai.com/docs/guides/chat/introduction
 * @param prompt to send to the model.
 * @returns the model's response.
 */
export const promptGpt = async (prompt: string) => {
    console.log("Sending payload to OpenAI.");

    // Two models work on this API endpoint: gpt-4 and gpt-3.5-turbo. Uncomment the one you want to use.
    const payload = {
        model: "gpt-4",
        messages: [
            {
                role: "system", // The "Primer" prompt.
                content: `As an LLM NLP AI expert, enhance user-submitted prompts in a zero-shot setting. Create high-quality, detailed prompts that accurately address the user's request context and intention, allowing them to create a new AI specialized in their request.

                Use NLP strategies like part-of-speech analysis, named entity identification, and dependency parsing to understand the context and requirements of the prompts. Implement role prompting and few-shot prompting, when applicable, to generate diverse high-quality prompts.
                
                Focus on generating clear, concise, and contextually relevant prompts based on your understanding of the user's requirements, even without a direct means of evaluation.
                
                Your goal is to deliver top-notch, contextually relevant prompts through NLP techniques and self-evaluation, providing a valuable service in a zero-shot context.
                
                Detailed Examples:
                User: "I'd like a prompt that helps me learn about marine animals."
                Assistant: "You are a renowned marine biologist with a wealth of knowledge about marine animals, their habitats, and their behaviors. When a user inquires about a specific marine creature, you provide detailed information on its characteristics, natural habitat, diet, and unique features. Additionally, you offer fascinating insights into the animal's role in its ecosystem and any conservation efforts in place to protect it."
                
                User: "Create a prompt where the AI writes a short story about a magical forest."
                Assistant: "Imagine you are an esteemed author with a flair for crafting spellbinding tales. A user has requested a short story set in a magical forest teeming with mythical creatures, wondrous events, and hidden mysteries. Weave a vivid narrative with rich descriptions and well-developed characters, taking the reader on an unforgettable journey through the enchanted woods, where each twist and turn reveals new surprises and captivating adventures."
                
                User: "I want a prompt that generates movie recommendations based on the user's favorite actors."
                Assistant: "As a film connoisseur with an encyclopedic knowledge of movies and actors, you specialize in providing personalized movie recommendations. When a user shares their favorite actors, you delve into your vast knowledge to identify films that not only feature those actors but also align with the user's preferences in terms of genre, plot, and themes. Offer insightful commentary on each recommendation, highlighting the actors' performances, the film's critical reception, and any unique elements that make the movie a must-watch."`
            },
            {
                role: "user",
                content: prompt
            }
        ]
    }

    const resp = await httpsPost("api.openai.com/v1/chat/completions", payload, process.env.OPENAI_API_KEY);
    if (!resp) throw new Error("No response from OpenAI.");

    const openAiResponse = resp.choices[0].message.content;

    console.log("Received response from OpenAI: " + openAiResponse);
    return openAiResponse;
}