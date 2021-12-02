export interface GetAuthUrlResponse {
    url: string;
}

export interface GetAccessTokenRequest {
    authToken: string,
    redirectUri: string
}

export interface GetAccessTokenResponse {
    tokenKey: string,
    refreshToken: string,
    expiresAfterDate: Date
}

export interface RefreshAccessTokenRequest {
    refreshToken: string,
}

export interface RefreshAccessTokenResponse {
    tokenKey: string,
    expiresAfterDate: Date
}