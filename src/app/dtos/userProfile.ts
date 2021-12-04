export interface UserProfileResponse {
    userProfile: UserProfile,

}

export class UserProfile {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public spotifyUri: String,
        public createdAt: String
    ) {}
}