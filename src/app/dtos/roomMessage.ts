export interface RoomMessage {
    id: string
    roomId: string
    profileId: string
    userName: string
    userAvatarUrl?: string
    messageText: string
    createdAt: Date
}