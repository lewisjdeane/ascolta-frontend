import React from "react"
import { Link } from "react-router-dom"
import { languages } from "../types"

const ComprehensionCard = () => {
    return (
        <div className="my-8 rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Practice listening comprehension</div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {languages
                        .filter((language) => language.filter)
                        .map((language) => (
                            <div
                                key={language.code}
                                className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
                            >
                                <div className="flex-shrink-0">
                                    <img className="h-10 w-10 rounded-full object-cover" src={language.flag} alt="" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <Link to={`/conversation/${language.code}`}>
                                        <span className="absolute inset-0" aria-hidden="true" />
                                        <p className="text-md font-medium text-gray-900">{language.option}</p>
                                        {/* <p className="truncate text-sm text-gray-500">25 conversations</p> */}
                                    </Link>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default ComprehensionCard
