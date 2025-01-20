


// Custom modules
import model from "../lib/googleAi";


/**
 * Generate short conversation title based on prompts
 * This function utilize google generative ai model to create concise title. 
 * It sends user prompt to model and request a short title based on response
 * @async
 * @function getConversationTitle
 * @param {String} userPrompt - text input from which title will be generated
 * @returns {Promise<string>} - promise that resolves title as plain text
 */

const getConversationTitle = async (userPrompt) => {
    try {
        const result = await model.generateContent(
            `Given a user prompt, generate a concise and informative title that accurately describes the conversation. Consider keywords, topics,
            and the overall content intent of the prompt. Response in plain text format, not markdown.
            
            Prompt: ${userPrompt}`
        );
        return result.response.text();
    } catch (err) {
        console.log(`Error generating conversation title: ${err.message}`)
    }
}


/**
 * Generate response from AI model based on prompt and chat history
 * @param {string} userPrompt - user's input prompt
 * @param {Array<{ user_prompt: string, ai_response:string> }} chats - array of previous user prompts and AI responses, 
 * used to generate context to the model
 * @returns {Promise<string>} - promise that resolves AI response and rejects with an error 
 */
const getAiResponse = async (userPrompt, chats = []) => {

    const history = [];
    chats.forEach(({ user_prompt, ai_response }) => {
        history.push(
            {
                role: 'user',
                parts: [{ text: user_prompt }],
            },
            {
                role: 'model',
                parts: [{ text: ai_response }],
            }
        )
    })


    try {
        model.generationConfig = { temperature: 1.5 }
        const chat = model.startChat({ history });
        const result = await chat.sendMessage(userPrompt);

        return result.response.text();
    } catch (err) {
        console.log(`Error generating AI response: ${err.message}`)
    }
}

export { getConversationTitle, getAiResponse }