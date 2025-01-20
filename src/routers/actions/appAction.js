


// Node modules
import { redirect } from "react-router-dom";

// Custom modules
import { account, databases } from "../../lib/appwrite";
import { getConversationTitle, getAiResponse } from "../../api/googleAi";
import generateID from '../../utils/generateID'

/**
 * Handles user prompt action, creating conversation and storing user prompt and generated response
 * @async
 * @function userPromptAction
 * @param {FormData} formData - containing user prompts
 * @returns {Promise<void>} - redirect user to new conversation page
 */

const userPromptAction = async (formData) => {
    const userPrompt = formData.get('user_prompt');
    
    // get current user info
    const user = await account.get();

    // Get conversation title based on user prompt
    const conversationTitle = await getConversationTitle(userPrompt);
    let conversation = null;
    
    try {
        // Create new conversation document in Appwrite database
        conversation = await databases.createDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            'conversations',
            generateID(),
            {
                title: conversationTitle,
                user_id: user.$id,
            }
        )
    } catch (err) {
        console.log(`Error creating conversation: ${err.message}`)
    }

    // Generate AI response based on user prompt
    const aiResponse = await getAiResponse(userPrompt);
    
    try {
        // Create new chat document in 'chats' collection
        await databases.createDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            'chats',
            generateID(),
            {
                user_prompt: userPrompt,
                ai_response: aiResponse,
                conversation: conversation.$id,
            },
        )
    } catch (err) {
        console.log(`Error creating chat: ${err.message}`)
    }

    return redirect(`/${conversation.$id}`);
}

/**
 * Deletes conversation document from database and returns the conversation title.
 * @async
 * @function conversationAction
 * @param {FormData} formData - containing conversation details
 * @returns {Promise<string>} - returns the conversation title after deletion
 * @throws Will throw error if deletion process fails
 */
const conversationAction = async (formData) => {
    const conversationId = formData.get('conversation_id');
    const conversationTitle = formData.get('conversation_title');

    try {
        await databases.deleteDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            'conversations',
            conversationId,
        );

        return { conversationTitle }
    } catch (err) {
        console.log(`Error deleting conversation: ${err.message}`)
    }
}

/**
 * Handles incoming request based on 'request_type' form data
 * @async
 * @function appAction
 * @param {object} request - The incoming request object containing form data
 * @returns {Promise<*>} - returns the result of action based on 'request_type'
 */

const appAction = async ({ request }) => {
    const formData = await request.formData();
    const requestType = formData.get('request_type');

    if (requestType === 'user_prompt') {
        return await userPromptAction(formData);
    }

    if (requestType === 'delete_conversation') {
        return await conversationAction(formData);
    }
}

export default appAction;
