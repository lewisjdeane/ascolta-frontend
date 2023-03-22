import React from "react"
import Heading from "../common/Heading"
import ComprehensionCard from "./ComprehensionCard"
import LiveChatCard from "./LiveChatCard"

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <Heading text="Ascolta AI" />
            <LiveChatCard />
            <ComprehensionCard />
        </div>
    )
}

export default Home
