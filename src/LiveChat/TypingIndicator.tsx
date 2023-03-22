import React from "react"

const TypingIndicator = () => {
    const typingIndicatorClass = "w-2 h-2 bg-gray-700 rounded-full animate-bounce"
    return (
        <div className="flex items-end flex-none">
            <div className="flex items-center justify-center rounded-lg pt-1">
                <span className={`${typingIndicatorClass} mr-2`}></span>
                <span className={`${typingIndicatorClass} mr-2`} style={{ animationDelay: "0.15s" }}></span>
                <span className={typingIndicatorClass} style={{ animationDelay: "0.3s" }}></span>
            </div>
        </div>
    )
}

export default TypingIndicator
