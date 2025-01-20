// Custom modules
import { databases } from '../../lib/appwrite';
import { getAiResponse } from '../../api/googleAi';
import generateID from '../../utils/generateID';

/**
 * Handles conversation action, processing the user's prompt and storing the AI response in the database.
 * @async
 * @param {Object} context - context object containing request and params.
 * @param {Object} request - request object containing form data from client.
 * @param {Object} params - route parameters.
 * @returns {Promise<null>} returns null after processing and storing data.
 * @throws Will log error message to console if storing data fails.
 */

const conversationAction = async ({ request, params }) => {
    const { conversationId } = params;
    const formData = await request.formData();
    const userPrompt = formData.get('user_prompt');

    let chatHistory = [];
    let aiResponse = '';

    try {
        const { chats } = await databases.getDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            'conversations',
            conversationId,
        );

        chatHistory = chats.map(({ user_prompt, ai_response }) => {
            return { user_prompt, ai_response };
        });
    } catch (err) {
        console.log(`Error getting chats: ${err.message}`);
    }

    try {
        aiResponse = await getAiResponse(userPrompt, chatHistory);
    } catch (err) {
        console.log(`Error getting AI response: ${err.message}`);
    }

    try {
        await databases.createDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            'chats',
            generateID(),
            {
                user_prompt: userPrompt,
                ai_response: aiResponse,
                conversation: conversationId,
            },
        )
    } catch (err) {
        console.log(`Error storing chat: ${err.message}`);
    }

    return null;
};

export default conversationAction;
