import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Conversation, { loader as conversationLoader } from "./Conversation/Conversation"
import "./index.css"
import ConversationLibrary, { loader as libraryLoader } from "./ConversationLibrary/ConversationLibrary"
import LiveChat, { loader as liveChatLoader } from "./LiveChat/LiveChat"
import reportWebVitals from "./reportWebVitals"
import ApplicationWrapper from "./common/ApplicationWrapper"
import LiveChatCard from "./Home/LiveChatCard"
import ComprehensionCard from "./Home/ComprehensionCard"
import Home from "./Home/Home"

const root = ReactDOM.createRoot(document.getElementById("root")!)

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ApplicationWrapper active="/">
                <Home />
            </ApplicationWrapper>
        ),
    },
    {
        path: "/conversation",
        element: (
            <ApplicationWrapper active="/conversation">
                <ComprehensionCard />
            </ApplicationWrapper>
        ),
    },
    {
        path: "/conversation/it",
        element: (
            <ApplicationWrapper active="/conversation">
                <ConversationLibrary />
            </ApplicationWrapper>
        ),
        loader: () => libraryLoader("it"),
    },
    {
        path: "/conversation/es-ES",
        element: (
            <ApplicationWrapper active="/conversation">
                <ConversationLibrary />
            </ApplicationWrapper>
        ),
        loader: () => libraryLoader("es-ES"),
    },
    {
        path: "/conversation/pt-PT",
        element: (
            <ApplicationWrapper active="/conversation">
                <ConversationLibrary />
            </ApplicationWrapper>
        ),
        loader: () => libraryLoader("pt-PT"),
    },
    {
        path: "/conversation/de-DE",
        element: (
            <ApplicationWrapper active="/conversation">
                <ConversationLibrary />
            </ApplicationWrapper>
        ),
        loader: () => libraryLoader("de-DE"),
    },
    {
        path: "/conversation/id/:id",
        element: (
            <ApplicationWrapper active="/conversation">
                <Conversation />
            </ApplicationWrapper>
        ),
        loader: conversationLoader,
    },
    {
        path: "/live",
        element: (
            <ApplicationWrapper active="/live">
                <LiveChatCard />
            </ApplicationWrapper>
        ),
    },
    {
        path: "/live/es-ES",
        element: (
            <ApplicationWrapper active="/live">
                <LiveChat />
            </ApplicationWrapper>
        ),
        loader: () => liveChatLoader("es-ES"),
    },
    {
        path: "/live/it",
        element: (
            <ApplicationWrapper active="/live">
                <LiveChat />
            </ApplicationWrapper>
        ),
        loader: () => liveChatLoader("it"),
    },
    {
        path: "/live/pt-PT",
        element: (
            <ApplicationWrapper active="/live">
                <LiveChat />
            </ApplicationWrapper>
        ),
        loader: () => liveChatLoader("pt-PT"),
    },
    {
        path: "/live/de-DE",
        element: (
            <ApplicationWrapper active="/live">
                <LiveChat />
            </ApplicationWrapper>
        ),
        loader: () => liveChatLoader("de-DE"),
    },
])

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
