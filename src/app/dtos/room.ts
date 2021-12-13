export interface RoomsResponse {
    rooms: Room[]
}

export interface RoomResponse {
    room: Room
}

export interface UpdateRoomResponse {
    updated: boolean
}

export interface MakeRoomPrivateResponse {
    inviteCode: string
}

export interface Room {
    id: string
    title: string
    genreIds?: string[]
    status: string
    isPrivate: boolean
    imageUrl: string
    inviteCode?: string
    spotifyUri: string
    createdAt: Date
}