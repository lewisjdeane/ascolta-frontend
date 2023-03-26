import { ChatCompletionRequestMessage, ChatCompletionResponseMessage } from "openai"
import React, { ReactNode, useState } from "react"
import { useLoaderData } from "react-router-dom"
import ContactCard from "./ContactCard"
import { ApiResponseLiveChatSetup, AssistantMessage, languages, SuggestionType } from "../types"
import { generateNewLiveChat, sendLiveChatMessage } from "../api/live-chat"
import { mapWithIndex, parseMessage } from "./utils"
import LiveChatMessageContainer from "./LiveChatMessageContainer"
import LiveChatMessage from "./LiveChatMessage"
import IdeaButton from "./IdeaButton"
import LiveChatTypingMessage from "./LiveChatTypingMessage"
import ErrorBanner from "../common/ErrorBanner"

export async function loader(languageCode: string) {
    const data = await generateNewLiveChat(languageCode)
    return { data }
}

const LiveChat: () => JSX.Element = () => {
    const { data }: any = useLoaderData()
    const setup: ApiResponseLiveChatSetup = data
    const id = setup.id
    const character = setup.character
    const [messages, setMessages]: [ChatCompletionResponseMessage[], any] = useState([])
    const [input, setInput] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const [hitError, setHitError] = useState(false)

    async function sendMessage(text: string) {
        displayUserMessage(text)
        setInput("")
        setIsTyping(true)
        try {
            const messages = await sendLiveChatMessage(id, text)
            setIsTyping(false)
            setMessages(messages)
        } catch (error) {
            setIsTyping(false)
            setHitError(true)
        }
    }

    function displayUserMessage(text: string) {
        const message: ChatCompletionResponseMessage = { role: "user", content: text }
        setMessages([...messages, message])
    }

    function getReversedMessages(): ChatCompletionResponseMessage[] {
        return [...messages].reverse()
    }

    const handleSendMessage = async (event: React.FormEvent) => {
        event.preventDefault()
        if (input.trim() === "") return
        sendMessage(input)
    }

    function getImageSource(message: AssistantMessage): string {
        switch (message.suggestionType) {
            // Normal chat response, use character avatar.
            case SuggestionType.NONE:
                return character.avatar_url
            // Suggestion in the target language, use the appropriate flag.
            case SuggestionType.NATIVE:
                return languages.find((language) => language.code === character.language_config.language).flag
            // Suggestion in English, use a British flag.
            case SuggestionType.ENGLISH:
                return "https://flagicons.lipis.dev/flags/4x3/gb.svg"
        }
    }

    function renderMessages(): ReactNode {
        return mapWithIndex(getReversedMessages(), (index, message) => renderMessage(index, message))
    }

    /**
     * Renders a given a API message in the conversation.
     * @param index The index of the response in the conversation.
     * @param message The message in the API conversation - does not map 1-1 with what the user sees
     * @returns The components to render this API message.
     */
    function renderMessage(index: number, message: ChatCompletionRequestMessage): ReactNode {
        switch (message.role) {
            case "system":
                return <></>
            case "user":
                return (
                    <LiveChatMessageContainer isUser={true}>
                        <LiveChatMessage isUser={true} suggestionType={SuggestionType.NONE}>
                            {message.content}
                        </LiveChatMessage>
                    </LiveChatMessageContainer>
                )
            case "assistant":
                // Message response is expected to be JSON from the assistant so we parse it to get out the various bits to present.
                const parsed = parseMessage(message.content)
                const messages = parsed.messages
                const ideas = parsed.ideas

                return messages.map((messagePart) => {
                    return (
                        <LiveChatMessageContainer isUser={false} avatar_url={getImageSource(messagePart)}>
                            <LiveChatMessage
                                isUser={false}
                                suggestionType={messagePart.suggestionType}
                                text={messagePart.message}
                            >
                                {renderIdeas(index, messagePart.suggestionType, ideas)}
                            </LiveChatMessage>
                        </LiveChatMessageContainer>
                    )
                })
            default:
                return <></>
        }
    }

    /**
     * Renders the list of ideas in the chat message as small buttons that the user can click to send.
     * @param index The index of this parent message in the conversation.
     * @param suggestionType Indicates whether or not this message is considered a suggestion or not.
     * @param ideas A list of ideas to send in response to the AI's last message.
     * @returns The components for the ideas if we are to show them now.
     */
    function renderIdeas(index: number, suggestionType: SuggestionType, ideas: string[]): ReactNode {
        // Only show ideas if:
        //  1. This is the latest message in the conversation - no point showing older ones.
        //  2. If this message is not a suggestion - we only want to render the items in the character's response message box.
        if (index === 0 && suggestionType === SuggestionType.NONE) {
            return ideas.map((idea) => <IdeaButton text={idea} onClick={() => sendMessage(idea)} />)
        } else {
            return <></>
        }
    }

    return (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {/* Show a summary of the character that the user is chatting to. */}
            <ContactCard
                name={character.name}
                age={character.age}
                occupation={character.occupation}
                avatarUrl={character.avatar_url}
            />

            {hitError ?
                /* Render error message. */
                <ErrorBanner title="Sorry, we are unable to generate responses at the moment, please try again later. Thank you for your patience."/> :

                /* Text box and send button. */
                <form className="flex-grow flex mt-8 mb-4" onSubmit={handleSendMessage}>
                    <input
                        id="textInput"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full px-4 py-2 inline rounded-md border-2 border-indigo-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-indigo-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Type a message"
                    />
                    <button
                        type="submit"
                        className="ml-4 inline-flex items-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Send
                    </button>
                </form>
            }

            {/* If we are waiting for a response from the backend, show a nice typing animation. */}
            {isTyping ? <LiveChatTypingMessage avatar_url={character.avatar_url} /> : <></>}

            {/* Render the list of messages in the conversation. */}
            {renderMessages()}
        </div>
    )
}

export default LiveChat
