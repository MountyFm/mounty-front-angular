import { Room } from "./room";
import {Track} from "./track";

export interface RoomAndTracksResponse {
    room: Room,
    tracks: Track[]
}