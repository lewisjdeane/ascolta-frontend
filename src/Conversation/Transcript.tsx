import React from "react"
import { ApiResponseConversation } from "../types"

interface TranscriptProps {
    conversation: ApiResponseConversation
}

const Transcript: React.FC<TranscriptProps> = ({ conversation }) => {
    function getAvatarUrlForCharacterWithName(name: string): string {
        return conversation.characters.find((character) => character.name === name).avatar_url
    }

    return (
        <>
            <p className="font-black text-[36px] text-center mt-16">Transcript</p>
            <div className="h-2 mx-auto w-32 bg-black"></div>
            <ul className="mt-4">
                {conversation.parts.map((part) => (
                    <li className="flex py-1">
                        <img
                            className="h-6 w-6 rounded-full"
                            src={getAvatarUrlForCharacterWithName(part.name)}
                            alt=""
                        />
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900 inline">{part.name}</p>
                            <p className="pl-2 text-sm text-gray-500 inline">{part.text}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Transcript
