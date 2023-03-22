import React from "react"
import { useLoaderData } from "react-router-dom"
import ConversationGrid from "./ConversationGrid"
import { ApiResponseLibraryElement } from "../types"
import { getConversations } from "../api/conversations"
import Heading from "../common/Heading"

export async function loader(languageCode: string) {
    const data = await getConversations(languageCode)
    return { data }
}

const ConversationLibrary: () => JSX.Element = () => {
    const { data }: any = useLoaderData()
    const conversations: ApiResponseLibraryElement[] = data

    return (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Heading text="Conversations" />
            <ConversationGrid items={conversations} />
        </div>
    )
}

export default ConversationLibrary
