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