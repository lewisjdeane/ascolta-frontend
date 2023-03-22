import axios from "axios"
import { ChatCompletionRequestMessage } from "openai"
import config from "../config"
import { LiveChatMessagePostBody, ApiResponseLiveChatState, ApiResponseLiveChatSetup } from "../types"

/**
 * Seeds a new live chat by asking for a session ID that will be used for all messages in the conversation.
 *
 * @param languageCode The code of the language to start, e.g. "it" for Italian.
 * @returns The information required to be able for the active conversation: session ID and messages.
 */
export async function generateNewLiveChat(languageCode: string): Promise<ApiResponseLiveChatSetup> {
    const response = await fetch(`${config.BACKEND_URL}/live/new?language=${languageCode}`)
    const text = await response.text()
    return JSON.parse(text)
}

/**
 * Sends a user message in the live chat and gets a response from the chatbot.
 *
 * @param id The session ID of the conversation.
 * @param text The text that user is sending.
 * @returns The latest list of messages in the conversation.
 */
export async function sendLiveChatMessage(id: string, text: string): Promise<ChatCompletionRequestMessage[]> {
    const body: LiveChatMessagePostBody = { id: id, text: text }
    const headers = { "Content-Type": "application/json" }
    const response = await axios.post(`${config.BACKEND_URL}/live/next`, JSON.stringify(body), { headers })
    const responseData: ApiResponseLiveChatState = await response.data
    const messages = responseData.messages
    return messages
}
