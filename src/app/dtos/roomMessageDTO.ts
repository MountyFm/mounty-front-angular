export class RoomMessageDTO {
    roomId: string;
    profileId: string;
    userName: string;
    userAvatarUrl?: string;
    messageText: string;

    constructor(
        roomId: string,
        profileId: string,
        userName: string,
        messageText: string,
        userAvatarUrl?: string,
    ){
        this.roomId = roomId
        this.profileId = profileId
        this.userName = userName
        this.userAvatarUrl = userAvatarUrl
        this.messageText = messageText
    }
}