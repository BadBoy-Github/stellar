

// Node modules
import { motion } from "framer-motion"
import { useLoaderData, useLocation } from "react-router-dom"

// Custom hooks
import { usePromptPreloader } from "../hooks/userPromptPreloader"

// Components
import PageTitle from "../components/PageTitle"
import UserPrompt from "../components/UserPrompt"
import AiResponse from "../components/AiResponse"
import PromptPreloader from "../components/PromptPreloader"

const Conversation = () => {

  /**
   * Extract conversation data (title and chats) from loader data
   * Handling potential undefined values using optional chaining
   */

  const { conversation: { title, chats } } = useLoaderData() || {};

  // Retrieves prompt preloader value using custom hook 'usePromptPreloader'
  const { promptPreloaderValue } = usePromptPreloader();

  // Obtain current url location info using useLocation hook.
  const location = useLocation();

  return (

    <>
      {/* Meta title */}
      <PageTitle
        title={`${title} | Stellar`}
      />

      <motion.div
        className="max-w-[700px] mx-auto !will-change-auto"
        initial={!location.state?._isRedirect && { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.05, ease: 'easeOut' }}
      >
        {chats.map((chat) => (
          <div key={chat.$id}>

            {/* User prompt */}
            <UserPrompt text={chat.user_prompt} />

            {/* AI response */}
            <AiResponse aiResponse={chat.ai_response} />

          </div>

        ))}
      </motion.div>

      {promptPreloaderValue && (
        <PromptPreloader promptValue={promptPreloaderValue} />
      )}
    </>
  );
}

export default Conversation;