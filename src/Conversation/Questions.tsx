import React, { useState } from "react"
import { ApiResponseConversation } from "../types"

interface QuestionsProps {
    conversation: ApiResponseConversation
}

const Questions: React.FC<QuestionsProps> = ({ conversation }) => {
    const [showCheckAnswersButton, setShowCheckAnswersButton]: [boolean, any] = useState(false)

    function shouldEnableCheckButton() {
        const inputs: HTMLCollectionOf<HTMLInputElement> = document.getElementsByTagName("input")
        var count = 0
        for (var i = 0; i < inputs.length; i++) {
            const input = inputs.item(i)
            if (input.checked) {
                count++
            }
        }

        setShowCheckAnswersButton(count === conversation.questions.length)
    }

    function checkAnswers() {
        const correct: HTMLCollectionOf<Element> = document.getElementsByClassName("correct")
        const incorrect: HTMLCollectionOf<Element> = document.getElementsByClassName("incorrect")

        // Correct answers should be green.
        for (var i = 0; i < correct.length; i++) {
            const input = correct.item(i) as HTMLInputElement
            const id = input.id
            const label = document.getElementById(`label-${id.split("-")[1]}`)
            label.className = label.className + " text-green-500"
            input.className = input.className + " text-green-500 focus:ring-green-500"
        }

        // Incorrect answers should be red, only if they are checked however as we don't want to highlight all of them.
        for (var j = 0; j < incorrect.length; j++) {
            const input = incorrect.item(j) as HTMLInputElement
            if (input.checked) {
                const id = input.id
                const label = document.getElementById(`label-${id.split("-")[1]}`)
                label.className = label.className + " text-red-500"
                input.className = input.className + " text-red-500 focus:ring-red-500"
            }
        }
    }

    return (
        <div>
            <p className="font-black text-[36px] text-center mt-16">Questions</p>
            <div className="h-2 mx-auto w-32 bg-black"></div>

            <div className="mt-8 px-4 place-items-center">
                {conversation ? (
                    <div>
                        {conversation.questions.map((question) => (
                            <div className="mt-4 overflow-hidden rounded-lg bg-white shadow">
                                <div className="px-4 py-5 sm:p-6">
                                    <label className="text-base font-bold text-gray-900">{question.question}</label>
                                    <fieldset className="mt-2">
                                        <legend className="sr-only">Answer</legend>
                                        <div className="space-y-4 mt-4">
                                            {question.answers.map((answer) => (
                                                <div key={answer.answer} className="flex items-center">
                                                    <input
                                                        id={`input-${answer.answer}`}
                                                        name={question.question}
                                                        onChange={shouldEnableCheckButton}
                                                        type="radio"
                                                        className={`h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500 ${
                                                            answer.is_correct ? "correct" : "incorrect"
                                                        }`}
                                                    />
                                                    <label
                                                        id={`label-${answer.answer}`}
                                                        htmlFor={`input-${answer.answer}`}
                                                        className="ml-3 block text-sm font-medium text-gray-700"
                                                    >
                                                        {answer.answer}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        ))}
                        <div className="flex items-center w-full">
                            <button
                                type="button"
                                onClick={checkAnswers}
                                disabled={!showCheckAnswersButton}
                                className={`mt-4 mx-auto inline-flex items-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm ${
                                    showCheckAnswersButton
                                        ? "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        : "bg-indigo-200"
                                }`}
                            >
                                Check answers
                            </button>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}

export default Questions
