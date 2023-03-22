import { AssistantFormat, AssistantMessage } from "../types"

export function parseMessage(text: string): AssistantMessage[] {
    var fallback: AssistantMessage = { message: text, isSuggestion: false }
    try {
        const format: AssistantFormat = JSON.parse(text)
        const message: AssistantMessage = { message: format.message, isSuggestion: false }
        if (format.suggestions.trim().length === 0) {
            return [message]
        } else {
            const suggestions: AssistantMessage = { message: format.suggestions, isSuggestion: true }
            return [message, suggestions]
        }
    } catch (e: any) {
        return [fallback]
    }
}
