

// Mode modules
import { redirect } from "react-router-dom";


// Custom modules
import { account } from "../../lib/appwrite"
import generateID from "../../utils/generateID";

// Handles user registration
const registerAction = async ({ request }) => {
    // Retrieve the form data from the incoming request
    const formData = await request.formData();

    try {
        // Create new user account using the provided email, pass and name

        await account.create(
            generateID(), // Generates a unique ID for the user
            formData.get('email'), // Retrieves the email from the form
            formData.get('password'), // Retrieves the password from the form
            formData.get('name'), // Retrieves the name from the form
        )
    } catch (err) {
        // Returns an error object if account creation fails
        return {
            message: err.message, // Returns the error message from the caught error
        }
    }

    // Redirects the user to the login page after successful registration
    try {
        // Create session using the provided email and password
        await account.createEmailPasswordSession(
            formData.get('email'),
            formData.get('password'),
        );
    } catch (err) {
        // Returns an error object if session creation fails
        console.log(`Error creating email password session: ${err.message}`);
        return redirect('/login');
    }

    // Redirects the user to the homepage after successful registration
    return redirect('/');
};

export default registerAction;
