

// Node modules
import { redirect } from "react-router-dom";

// Custom modules
import { account, databases } from "../../lib/appwrite";

const conversationLoader = async ({ params }) => {
    const { conversationId } = params;
    const data = {}

    try {
        // Attempt to retrieve user account information
        data.user = await account.get();
    } catch (err) {
        console.log(`Error getting user account: ${err.message}`);

        // If error, redirect to login page
        return redirect('/login');
    }

    try {
        // Attempt to retrieve conversation information from appwrite database
        data.conversation = await databases.getDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            'conversations',
            conversationId
        )
    } catch (err) {
        console.log(`Error getting conversation: ${err.message}`);
        throw err; //throw an error so it can be handled by error boundary or a suitable component.
    }

    // return data object containing user and conversation information
    return data;
}

export default conversationLoader;