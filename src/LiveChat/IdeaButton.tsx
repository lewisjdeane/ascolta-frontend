import React from "react"

export interface IdeaButtonProps {
    text: string
    onClick?: (string) => void
}

const IdeaButton: React.FC<IdeaButtonProps> = ({ text, onClick }) => {
    return (
        <button
            type="button"
            className="rounded-full uppercase bg-white py-1 px-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 mr-4 mt-2"
            onClick={() => onClick(text)}
        >
            {text}
        </button>
    )
}

export default IdeaButton
