


// Node modules
import { useState, useCallback } from "react";

/**
 * Custom hook for managing toggle state.
 * @returns {[boolean, Function]} An array containing the toggle state (boolean) and a function to toggle the state.
 */

const useToggle = () => {
    const [isOpen, setToggle] = useState(false);

    const toggle = useCallback(() => {
        setToggle((prev) => !prev);
    }, []);

    return [isOpen, toggle];
};

export { useToggle };