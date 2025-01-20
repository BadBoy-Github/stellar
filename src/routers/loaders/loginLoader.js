

// Node modules
import { redirect } from "react-router-dom";

// Custom modules
import { account } from "../../lib/appwrite";

const loginLoader = async () => {
    try {
        // Attempt to retrieve user account information
        await account.get();
    } catch (err) {
        console.log(`Error getting user session details: ${err.message}`);
        return null;
    }

    // if account retrieval is successful, redirect to home page
    return redirect('/');
}

export default loginLoader;