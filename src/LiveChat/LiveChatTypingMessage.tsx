import React from "react"
import { SuggestionType } from "../types"
import LiveChatMessage from "./LiveChatMessage"
import LiveChatMessageContainer from "./LiveChatMessageContainer"
import TypingIndicator from "./TypingIndicator"

export interface LiveChatTypingMessageProps {
    avatar_url: string
}

const LiveChatTypingMessage: React.FC<LiveChatTypingMessageProps> = ({ avatar_url }) => {
    return (
        <LiveChatMessageContainer isUser={false} avatar_url={avatar_url}>
            <LiveChatMessage isUser={false} suggestionType={SuggestionType.NONE}>
                <TypingIndicator />
            </LiveChatMessage>
        </LiveChatMessageContainer>
    )
}

export default LiveChatTypingMessage
