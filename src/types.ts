import { ChatCompletionResponseMessage } from "openai"

export interface ApiResponseConversation {
    characters: CharacterWithLanguageConfig[]
    parts: ConversationPart[]
    questions: Question[]
    audio: string
    language: string
    title: string
}

export interface ApiResponseLibraryElement {
    id: string
    characters: Character[]
    location: string
    title: string
    language: string
    length: string
    audio: string | null
}

export interface ConversationPart {
    name: string
    text: string
}

export interface LanguageConfig {
    language: string
    voice: string
    speed: number
    pitch: number
}

export interface Question {
    question: string
    answers: Answer[]
}

export interface Answer {
    answer: string
    is_correct: boolean
}

export interface Character {
    name: string
    gender: string
    age: number
    occupation: string
    avatar_url: string
}

export interface CharacterWithLanguageConfig {
    name: string
    gender: string
    age: number
    occupation: string
    avatar_url: string
    language_config: LanguageConfig
}

export enum ConversationLength {
    Short,
    Medium,
    Long,
}

export interface ApiResponseLiveChatSetup {
    id: string
    character: CharacterWithLanguageConfig
}

export interface ApiResponseLiveChatState {
    id: string
    messages: ChatCompletionResponseMessage[]
}

export interface LanguageOption {
    option: string
    filter: Boolean
    code: string | undefined
    flag: string | undefined
}

export interface LiveChatMessagePostBody {
    id: string
    text: string
}

export interface AssistantFormat {
    message: string
    suggestions: string
    suggestions_en: string
    ideas: string[]
}

export interface AssistantMessage {
    message: string
    suggestionType: SuggestionType
}

export interface AssistantResponse {
    messages: AssistantMessage[]
    ideas: string[]
}

export enum SuggestionType {
    NONE,
    ENGLISH,
    NATIVE,
}

export const LanguageAll = { option: "All", filter: false, code: null, flag: null }
export const LanguageGerman = {
    option: "German",
    filter: true,
    code: "de-DE",
    flag: "https://flagicons.lipis.dev/flags/4x3/de.svg",
}
export const LanguageItalian = {
    option: "Italian",
    filter: true,
    code: "it",
    flag: "https://flagicons.lipis.dev/flags/4x3/it.svg",
}
export const LanguagePortuguese = {
    option: "Portuguese",
    filter: true,
    code: "pt-PT",
    flag: "https://flagicons.lipis.dev/flags/4x3/pt.svg",
}
export const LanguageSpanish = {
    option: "Spanish (Spain)",
    filter: true,
    code: "es-ES",
    flag: "https://flagicons.lipis.dev/flags/4x3/es.svg",
}
export const languages: LanguageOption[] = [
    LanguageAll,
    LanguageGerman,
    LanguageItalian,
    LanguagePortuguese,
    LanguageSpanish,
]
