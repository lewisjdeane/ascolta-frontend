import React from "react"

const ContactCard = ({ name, age, occupation, avatarUrl }) => {
    return (
        <div className="max-w-md mx-auto rounded-md overflow-hidden shadow-md bg-white p-4 mt-4">
            <div className="flex items-center">
                <img src={avatarUrl} alt={name} className="w-16 h-16 rounded-full object-cover mr-4" />
                <div>
                    <h2 className="text-lg font-medium text-gray-800">
                        <b>{name}</b>, {age}
                    </h2>
                    <p className="text-sm text-gray-600">{occupation}</p>
                </div>
            </div>
        </div>
    )
}

export default ContactCard
