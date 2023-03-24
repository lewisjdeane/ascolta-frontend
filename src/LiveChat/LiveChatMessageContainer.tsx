import React, { ReactNode } from "react"

export interface LiveChatMessageContainerProps {
    children: ReactNode
    isUser: boolean
    avatar_url?: string
}

function containerClasses(isUser: boolean): string {
    return isUser ? "flex justify-end mb-4" : "flex justify-start mb-4"
}

const LiveChatMessageContainer: React.FC<LiveChatMessageContainerProps> = ({ children, isUser, avatar_url }) => {
    return (
        <div className={containerClasses(isUser)}>
            {avatar_url ? <img alt="" src={avatar_url} className={"w-8 h-8 rounded-full mr-2 object-cover"} /> : <></>}
            {children}
        </div>
    )
}

export default LiveChatMessageContainer
