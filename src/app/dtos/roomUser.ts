export interface RoomUser {
    id: string
    profileId: string
    roomId: string
    type: string
    isActive: string
}

export interface RoomUserResponse {
    roomUser: RoomUser
}