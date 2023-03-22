import { ChatCompletionResponseMessage } from "openai"
import React, { useState } from "react"
import { useLoaderData } from "react-router-dom"
import ContactCard from "./ContactCard"
import { ApiResponseLiveChatSetup } from "../types"
import { generateNewLiveChat, sendLiveChatMessage } from "../api/live-chat"
import { parseMessage } from "./utils"
import TypingIndicator from "./TypingIndicator"

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

    async function sendMessage() {
        const userInput = input
        displayUserMessage(userInput)
        setInput("")
        setIsTyping(true)
        const messages = await sendLiveChatMessage(id, userInput)
        setIsTyping(false)
        setMessages(messages)
    }

    function displayUserMessage(text: string) {
        const message: ChatCompletionResponseMessage = { role: "user", content: text }
        setMessages([...messages, message])
    }

    function getReversedMessages(): ChatCompletionResponseMessage[] {
        return [...messages].reverse()
    }

    function containerClasses(isUser: boolean): string {
        return isUser ? "flex justify-end mb-4" : "flex justify-start mb-4"
    }

    function messageClasses(isUser: boolean, isSuggestion: boolean = false): string {
        const commonClasses = "whitespace-pre-wrap p-2 rounded-lg max-w-xl"
        if (isUser) {
            return `${commonClasses} bg-indigo-500 text-white`
        } else if (isSuggestion) {
            return `${commonClasses} bg-green-200 text-gray-700 text-sm font-bold`
        } else {
            return `${commonClasses} bg-gray-300 text-black`
        }
    }

    const handleSendMessage = async (event: React.FormEvent) => {
        event.preventDefault()
        if (input.trim() === "") return
        sendMessage()
    }

    return (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <ContactCard
                name={character.name}
                age={character.age}
                occupation={character.occupation}
                avatarUrl={character.avatar_url}
            />

            <form className="flex-grow flex mt-8 mb-4 mx-4" onSubmit={handleSendMessage}>
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

            {isTyping ? (
                <div className={containerClasses(false)}>
                    {<img alt="" src={character.avatar_url} className={"w-8 h-8 rounded-full mr-2"} />}
                    <div className={messageClasses(false, false)}>
                        <TypingIndicator />
                    </div>
                </div>
            ) : (
                <></>
            )}

            {getReversedMessages().map((message) => {
                if (message.role === "system") {
                    return <></>
                } else if (message.role === "user") {
                    return (
                        <div className={containerClasses(true)}>
                            <div className={messageClasses(true)}>
                                <p>{message.content}</p>
                            </div>
                        </div>
                    )
                } else {
                    return parseMessage(message.content).map((part) => {
                        return (
                            <div className={containerClasses(false)}>
                                {
                                    <img
                                        alt=""
                                        src={character.avatar_url}
                                        className={`w-8 h-8 rounded-full mr-2 ${
                                            part.isSuggestion ? "invisible" : "visible"
                                        }`}
                                    />
                                }
                                <div className={messageClasses(false, part.isSuggestion)}>
                                    <p>{part.message}</p>
                                </div>
                            </div>
                        )
                    })
                }
            })}
        </div>
    )
}

export default LiveChat
