


// Custom modules
import { account } from "../lib/appwrite";

/**
 * Logs the user out of their account by deleting their session and navigate to login page.
 * 
 * @async
 * @function logout
 * @param {function} navigate - The navigate user after logout
 * @returns {Promise<void>} - A promise that resolves when the logout is complete
 * @throws {Error} - If there is an error deleting the user session, error will be logger in the console
 */

const logout = async (navigate) => {
    try {
        await account.deleteSession('current');
    } catch (err) {
        return console.log(`Error delete user session: ${err.message}`)
    }

    return navigate('/login');
}

export default logout;