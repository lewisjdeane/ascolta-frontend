import React from "react"

interface HeadingProps {
    text: string
}

const Heading: React.FC<HeadingProps> = ({ text }) => {
    return (
        <>
            <p className="font-black text-[36px] text-center mt-8">{text}</p>
            <div className="h-2 mx-auto w-32 bg-black"></div>
        </>
    )
}

export default Heading
