import { ApiResponseConversation } from "../types"

export function getAvatarUrlForCharacterWithName(conversation: ApiResponseConversation, name: string): string {
    const character = conversation.characters.find((character) => character.name === name)
    return character ? character.avatar_url : ""
}

export function formatAsMinsAndSeconds(seconds: number): string {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${getTimeDigit(mins)}:${getTimeDigit(secs)}`
}

function getTimeDigit(time: number): string {
    return time < 10 ? `0${time}` : `${time}`
}
