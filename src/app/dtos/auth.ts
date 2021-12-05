export interface GetAuthUrlResponse {
    url: string;
}

export class GetAccessTokenRequest {
    constructor(
         public authToken: string,
         public redirectUri: string,
        
        ){}
}

export interface RefreshAccessTokenRequest {
    refreshToken: string,
}

export interface AccessToken {
    tokenKey: string,
    refreshToken?: string,
    expiresAfterDate: Date
}