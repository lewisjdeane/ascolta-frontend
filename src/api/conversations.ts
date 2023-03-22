import config from "../config"
import { ApiResponseConversation, ApiResponseLibraryElement } from "../types"

/**
 * Gets the a list of all conversations in the given language from the backend.
 *
 * @param languageCode The code of the langauge to find, e.g. "it" for Italian.
 * @returns The matching conversations
 */
export async function getConversations(languageCode: string): Promise<ApiResponseLibraryElement[]> {
    const response = await fetch(`${config.BACKEND_URL}/conversation/list`)
    const json = await response.text()
    const parsedConversations: ApiResponseLibraryElement[] = JSON.parse(json)
    const filtered: ApiResponseLibraryElement[] = parsedConversations.filter(
        (conversation) => conversation.audio !== null && conversation.language === languageCode
    )
    return filtered
}

/**
 * Gets the conversation with the given ID from the backend.
 *
 * @param id The ID of the conversation to find.
 * @returns The matched conversation
 */
export async function getConversation(id: string): Promise<ApiResponseConversation> {
    const response = await fetch(`${config.BACKEND_URL}/conversation/id/${id}`)
    const json = await response.text()
    const parsedConversation: ApiResponseConversation = JSON.parse(json)
    return parsedConversation
}
