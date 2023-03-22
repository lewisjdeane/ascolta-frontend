import React from "react"
import { ApiResponseConversation } from "../types"

interface ConversationHeaderProps {
    conversation: ApiResponseConversation
}

const ConversationHeader: React.FC<ConversationHeaderProps> = ({ conversation }) => {
    return (
        <>
            <p className="font-black text-[36px] text-center">{conversation.title}</p>

            <div className="h-2 mx-auto w-32 bg-black mb-8"></div>
            <div className="mx-auto items-center text-center">
                {/* First character avatar */}
                <div className="inline-block items-center text-center">
                    <img className="h-16 w-16 rounded-full" src={conversation.characters[0].avatar_url} alt="" />
                    <p className="font-bold text-gray-900">{conversation.characters[0].name}</p>
                </div>
                {/* Second character avatar, overlaps slightly with first */}
                <div className="inline-block ml-4 text-center">
                    <img className="h-16 w-16 rounded-full" src={conversation.characters[1].avatar_url} alt="" />
                    <p className="font-bold text-gray-900"> {conversation.characters[1].name}</p>
                </div>
            </div>
        </>
    )
}

export default ConversationHeader
