export interface Track {
    id: string
    imageUrl: string
    spotifyUri: string
    artists: string[]
    name: string
    progressMs?: number
    duration: number
}

export interface GetCurrentlyPlayingTrackResponse {
    track?: Track
}