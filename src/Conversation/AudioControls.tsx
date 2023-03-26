import React, { useState } from "react"
import { formatAsMinsAndSeconds } from "./utils"

interface AudioControlsProps {
    audio: string
    showTranscript: boolean
    setShowTranscript: (value: boolean) => void
}

const AudioControls: React.FC<AudioControlsProps> = ({ audio, showTranscript, setShowTranscript }) => {
    const [audioPercentagePlayed, setAudioPercentagePlayed]: [number, any] = useState(null)
    const [audioCurrentTime, setAudioCurrentTime]: [string, any] = useState(null)
    const [audioLength, setAudioLength]: [string, any] = useState(null)
    const [isPlaying, setIsPlaying]: [boolean, any] = useState(false)

    function getAudioElement() {
        return document.getElementById("player") as HTMLAudioElement
    }

    function onTimeUpdate() {
        const audio = getAudioElement()
        setAudioCurrentTime(formatAsMinsAndSeconds(audio.currentTime))
        setAudioPercentagePlayed(Math.floor((100 * audio.currentTime) / audio.duration))
    }

    function onAudioLoaded() {
        const audio = getAudioElement()
        setAudioCurrentTime("00:00")
        setAudioPercentagePlayed(0)
        setAudioLength(formatAsMinsAndSeconds(audio.duration))
        setIsPlaying(false)
    }

    function onAudioEnded() {
        setIsPlaying(false)
    }

    function onPlay() {
        getAudioElement().play()
        setIsPlaying(true)
    }

    function onPause() {
        getAudioElement().pause()
        setIsPlaying(false)
    }

    return (
        <>
            <audio
                id="player"
                src={audio}
                onCanPlayThrough={onAudioLoaded}
                onCanPlay={onAudioLoaded}
                onLoadedMetadata={onAudioLoaded}
                onTimeUpdate={onTimeUpdate}
                onEnded={onAudioEnded}
            ></audio>{" "}
            {audioCurrentTime && audioLength ? (
                <>
                    <div className="flex items-center w-full">
                        <button
                            type="button"
                            onClick={isPlaying ? onPause : onPlay}
                            className="mt-4 mx-auto text-center w-32 uppercase rounded-full border border-transparent bg-indigo-600 px-4 py-2 text-base font-black text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            {isPlaying ? "Pause" : "Play"}
                        </button>
                    </div>
                    <div className="flex items-center px-4 mt-4">
                        <p className="inline-block w-16 pr-4 text-xs font-bold text-gray-500">{audioCurrentTime}</p>
                        <div id="progressTotal" className="rounded-l-full rounded-r-full w-full h-[6px] bg-gray-300">
                            <div
                                id="progressCurrent"
                                style={{ width: audioPercentagePlayed + "%" }}
                                className="rounded-l-full rounded-r-full h-[6px] bg-indigo-600"
                            ></div>
                        </div>
                        <p className="inline-block w-16 pl-4 text-xs font-bold text-gray-500">{audioLength}</p>
                    </div>

                    <div className="flex items-center w-full">
                        <button
                            type="button"
                            onClick={() => setShowTranscript(!showTranscript)}
                            className="mt-4 mx-auto text-center w-64 uppercase rounded-full border border-transparent bg-indigo-600 px-4 py-2 text-sm font-black text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            {showTranscript ? "Hide transcript" : "Show transcript"}
                        </button>
                    </div>
                </>
            ) : (
                <></>
            )}
        </>
    )
}

export default AudioControls
