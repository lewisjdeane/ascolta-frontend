import React, { ReactNode } from "react"
import { SuggestionType } from "../types"

export interface LiveChatMessageProps {
    children: ReactNode
    isUser: boolean
    suggestionType: SuggestionType
    text?: string
}

function messageClasses(isUser: boolean, suggestionType: SuggestionType): string {
    const commonClasses = "whitespace-pre-wrap p-2 rounded-lg max-w-xl"
    if (isUser) {
        return `${commonClasses} bg-indigo-500 text-white`
    } else if (suggestionType === SuggestionType.NONE) {
        return `${commonClasses} bg-gray-300 text-black`
    } else {
        return `${commonClasses} bg-green-200 text-gray-700 text-sm font-bold`
    }
}

const LiveChatMessage: React.FC<LiveChatMessageProps> = ({ children, isUser, suggestionType, text }) => {
    return (
        <div className={messageClasses(isUser, suggestionType)}>
            <p>{text}</p>
            {children}
        </div>
    )
}

export default LiveChatMessage
