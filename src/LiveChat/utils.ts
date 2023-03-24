import { AssistantFormat, AssistantMessage, AssistantResponse, SuggestionType } from "../types"

export function parseMessage(text: string): AssistantResponse {
    var messages: AssistantMessage[]
    var fallback: AssistantMessage = { message: text, suggestionType: SuggestionType.NONE }
    try {
        const format: AssistantFormat = JSON.parse(text)
        var ideas: string[]
        const message: AssistantMessage = { message: format.message, suggestionType: SuggestionType.NONE }
        if (format.suggestions.trim().length === 0) {
            messages = [message]
            ideas = format.ideas
        } else {
            const suggestions: AssistantMessage = { message: format.suggestions, suggestionType: SuggestionType.NATIVE }
            const englishSuggestions: AssistantMessage = {
                message: format.suggestions_en,
                suggestionType: SuggestionType.ENGLISH,
            }
            messages = [message, suggestions, englishSuggestions]
            ideas = format.ideas
        }
        const response: AssistantResponse = {
            messages: messages,
            ideas: ideas,
        }
        return response
    } catch (e: any) {
        const response: AssistantResponse = {
            messages: [fallback],
            ideas: [],
        }
        return response
    }
}

export function mapWithIndex<T, U>(array: T[], callback: (index: number, value: T) => U): U[] {
    return array.map((value, index) => callback(index, value))
}
