


// Node modules
import { motion } from "framer-motion"
import { useRef, useCallback, useState } from "react";
import { useSubmit, useNavigation, useParams } from "react-router-dom";

// Components
import { IconBtn } from "./Button"

const PromptField = () => {

    // inputField and inputFieldContainer - hold references to their DOM elements
    const inputField = useRef();
    const inputFieldContainer = useRef();

    // manual form submission
    const submit = useSubmit();

    // initial navigation for checking status
    const navigation = useNavigation();

    // Retrieve conversation id from url
    const { conversationId } = useParams();

    // State for input field
    const [placeholderShown, setPlaceholderShown] = useState(true);
    const [isMultiline, setIsMultiline] = useState(false);
    const [inputValue, setInputValue] = useState('');

    // handle input field input change
    const handleInputChange = useCallback(() => {
        if (inputField.current.innerText === '\n') inputField.current.innerHTML = '';

        setPlaceholderShown(!inputField.current.innerText)
        setIsMultiline(inputFieldContainer.current.clientHeight > 64);
        setInputValue(inputField.current.innerText.trim());
    }, []);

    // Move cursor to end after pasting text
    const moveCursorToEnd = useCallback(() => {
        const editableElement = inputField.current;
        const range = document.createRange();
        const selection = window.getSelection();

        // Set range to last child of editable element
        range.selectNodeContents(editableElement);
        range.collapse(false); // collapse range to end

        // Clear existing selection and add new range
        selection.removeAllRanges();
        selection.addRange(range);
    }, [])

    // Handle paste text
    const handlePaste = useCallback((e) => {
        e.preventDefault();
        inputField.current.innerText += e.clipboardData.getData('text');
        handleInputChange();
        moveCursorToEnd();
    }, [handleInputChange, moveCursorToEnd]);

    // Handle submit
    const handleSubmit = useCallback(() => {
        // Prevent form submission if input field is empty or form submission is in progress
        if (!inputValue || navigation.state === 'submitting') return;

        submit(
            {
                user_prompt: inputValue,
                request_type: 'user_prompt'
            },
            {
                method: 'POST',
                encType: 'application/x-www-form-urlencoded',
                action: `/${conversationId || ''}`,
            },
        );

        inputField.current.innerHTML = '';
        handleInputChange();
    }, [handleInputChange, inputValue, navigation.state, submit, conversationId]);

    // Defines framer motion variant for prompt field, controlling animation based on visibility
    const promptFieldVariant = {
        hidden: { scaleX: 0 },
        visible: {
            scaleX: 1,
            transition: {
                when: 'beforeChildren',
                staggerChildren: 0.2,
                duration: 0.4,
                delay: 0.4,
                ease: [0.05, 0.7, 0.1, 1],
            },
        },
    };

    // Defines framer motion variant for prompt field children, controlling animation based on visibility
    const promptFieldChildrenVariant = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    return (
        <motion.div
            className={`prompt-field-container ${isMultiline ? 'rounded-large' : ''} `}
            variants={promptFieldVariant}
            initial='hidden'
            animate='visible'
            ref={inputFieldContainer}
        >
            <motion.div
                className={`prompt-field ${placeholderShown ? '' : 'after:hidden'}`}
                contentEditable={true}
                role="textbox"
                aria-multiline={true}
                aria-label="Enter a prompt here"
                data-placeholder="Enter a prompt here"
                variants={promptFieldChildrenVariant}
                ref={inputField}
                onInput={handleInputChange}
                onPaste={handlePaste}
                onKeyDown={(e) => {
                    // Handle case when enter key is pressed
                    if (e.key === 'Enter' && !e.shiftKey) {
                        // Submit input 
                        e.preventDefault();
                        handleSubmit();
                    }
                }}
            />

            <IconBtn
                icon='send'
                title='Submit'
                size="large"
                classes="ms-auto"
                variants={promptFieldChildrenVariant}
                onClick={handleSubmit}
            />

            <div className="state-layer"></div>
        </motion.div>
    )
}

export default PromptField