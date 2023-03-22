import React from "react"
import { Link } from "react-router-dom"
import { ApiResponseLibraryElement, languages } from "../types"

interface ConversationGridProps {
    items: ApiResponseLibraryElement[]
}

const ConversationGrid: React.FC<ConversationGridProps> = ({ items }) => {
    return (
        <div className="grid grid-cols-1 gap-x-3 gap-y-0 sm:grid-cols-2 mt-4">
            {items.map((conversation) =>
                conversation.characters.length === 2 ? (
                    <div
                        key={conversation.id}
                        className="relative mb-3 flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
                    >
                        <div className="flex-shrink-0">
                            <img
                                className="h-16 w-16 rounded-full inline"
                                src={conversation.characters[0].avatar_url}
                                alt=""
                            />
                            <img
                                className="h-16 w-16 -ml-4 rounded-full inline"
                                src={conversation.characters[1].avatar_url}
                                alt=""
                            />
                        </div>
                        <div className="min-w-0 flex-1">
                            <Link to={`/conversation/id/${conversation.id}`}>
                                <span className="absolute inset-0" aria-hidden="true" />
                                <p className="text-sm font-medium text-gray-900">{conversation.title}</p>
                                <p className="truncate text-sm text-gray-500">
                                    {conversation.characters[0].name} and {conversation.characters[1].name}
                                </p>
                                <div>
                                    <span className="inline-flex items-center rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                                        {languages.find((lang) => lang.code === conversation.language).option}
                                    </span>
                                    <span className="inline-flex items-center rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 ml-2">
                                        {conversation.length}
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <></>
                )
            )}
        </div>
    )
}

export default ConversationGrid
