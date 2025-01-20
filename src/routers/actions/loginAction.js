


// Node modules
import { redirect } from "react-router-dom";

// Custom modules
import { account } from "../../lib/appwrite";

// Handle login action
const loginAction = async ({ request }) => {
    // Retrieve form data from incoming request
    const formData = await request.formData();

    try {
        // Attempt to create session using email and pass from form data
        await account.createEmailPasswordSession(
            formData.get('email'),
            formData.get('password'),
        );

        // On successful login, redirect to home page
        return redirect('/')
    } catch (err) {
        // Return error response with error message
        return {
            message: err.message,
        }
    }
}


export default loginAction;