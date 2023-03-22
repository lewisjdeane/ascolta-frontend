import React, { useState } from "react"
import { useLoaderData } from "react-router-dom"
import { ApiResponseConversation } from "../types"
import Questions from "./Questions"
import Transcript from "./Transcript"
import AudioControls from "./AudioControls"
import ConversationHeader from "./ConversationHeader"
import { getConversation } from "../api/conversations"

export async function loader({ params }) {
    const data = await getConversation(params.id)
    return { data }
}

const Conversation = () => {
    const { data }: any = useLoaderData()
    const conversation: ApiResponseConversation = data
    const [showTranscript, setShowTranscript]: [boolean, any] = useState(false)

    return (
        <>
            <div className="min-h-full">
                <div className="py-10">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 w-full md:w-1/2">
                        <ConversationHeader conversation={conversation} />
                        {conversation ? (
                            <AudioControls
                                audio={conversation.audio}
                                showTranscript={showTranscript}
                                setShowTranscript={setShowTranscript}
                            />
                        ) : (
                            <></>
                        )}
                        {showTranscript ? <Transcript conversation={conversation} /> : <></>}
                        <Questions conversation={conversation} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Conversation
