


// Node modules
import { useEffect, useState } from "react";
import { useNavigation } from "react-router-dom";

/**
 * Custom hook to manage preloader value for prompt.
 * @returns {{ usePromptPreloaderValue: string }} An object containing the preloader value.
 */

const usePromptPreloader = () => {

    // Get navigation state
    const navigation = useNavigation();

    // Initialize preloader value
    const [ promptPreloaderValue, setPromptPreloaderValue ] = useState('');

    // use iseEffect to update preloader value based on navigation.formData
    useEffect(() => {
        // If form data exists, get user prompt and update preloader value
        if (navigation.formData) {
            setPromptPreloaderValue(navigation.formData.get('user_prompt'));
        } else {
            // If no form data found, reset preloader value to empty string
            setPromptPreloaderValue('');
        }
    } ,[ navigation ]);  // run only when navigation state changes

    return { promptPreloaderValue };
}

export { usePromptPreloader };


