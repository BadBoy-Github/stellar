


// Node modules
import PropTypes from "prop-types"
import { useLoaderData } from "react-router-dom"
import { useRef, useState, useEffect } from "react"

// Custom modules
import { useToggle } from "../hooks/useToggle"

// Components
import Avatar from "./Avatar"
import { IconBtn } from "./Button"


const UserPrompt = ({ text }) => {

    // retrieve user data from loader using useLoaderData hook
    const { user } = useLoaderData()

    // use useToggle hook to manage expanded state of user prompt text
    const [isExpanded, toggleExpand] = useToggle();

    // Create ref to access textbox element in DOM
    const textBoxRef = useRef();

    // Initialize hasMoreContent state, indicating if there is more content to display
    const [hasMoreContent, setHasMoreContent] = useState(false);

    /**
     * useEffect to update hasMoreContent state whether text box ref changes.
     * This ensures that the state is updated correctly if tec=xt box content changes.
     */
    useEffect(() => {
        setHasMoreContent(
            textBoxRef.current.scrollHeight > textBoxRef.current.clientHeight
        )
    }, [textBoxRef])

    return (
        <div className="grid grid-cols-1 items-start gap-1 py-4 md:grid-cols-[max-content,minmax(0,1fr),max-content] md:gap-5">

            <Avatar name={user?.name} />

            <p
                className={`text-bodyLarge pt-1 whitespace-pre-wrap ${!isExpanded ? 'line-clamp-4' : ''} `}
                ref={textBoxRef}
            >
                {text}
            </p>

            {hasMoreContent && (
                <IconBtn
                    icon={isExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                    onClick={toggleExpand}
                    title={isExpanded ? 'Collapse text' : 'Expand text'}
                />
            )}


        </div>
    )
}

UserPrompt.propTypes = {
    text: PropTypes.string,
}

export default UserPrompt