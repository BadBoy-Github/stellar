



// Node modules
import { redirect } from "react-router-dom";

// Custom modules
import { account } from "../../lib/appwrite";

const resetPasswordLoader = async ({ request }) => {
    const url = new URL(request.url);

    try {
        // Attempt to retrieve user account information
        await account.get();

        // if account retrieval is successful, redirect to home page
    return redirect('/');

    } catch (err) {
        console.log(`Error getting user session details: ${err.message}`);
    }

    if(!url.searchParams.get('userId') && !url.searchParams.get('secret')) {
        return redirect('/reset-link')
    }

    return null;
}

export default resetPasswordLoader;