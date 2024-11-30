import { OutgoingMessage } from "./types";
import type { User } from "./User";


export class RoomManager {

    room : Map<string, User[]> = new Map();
    static instance : RoomManager;

    private constructor(){
        this.room = new Map();
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new RoomManager();
        }
        return this.instance;
    }

    public addUserToRoom(spaceId: string, user: User) {
        if (!this.room.has(spaceId)) {
            this.room.set(spaceId, [user]);
            return;
        }
        this.room.set(spaceId, [...(this.room.get(spaceId) ?? []), user]);
    }

    public removeUserFromRoom(spaceId: string, user: User) {
        if (!this.room.has(spaceId)) {
            return;
        }
        this.room.set(spaceId, (this.room.get(spaceId)?.filter((u) => u.id !== user.id) ?? []));
    }

    public broadcast(message: OutgoingMessage, user: User, roomId: string) {
        if (!this.room.has(roomId)) {
            return;
        }
        this.room.get(roomId)?.forEach((u) => {
            if (u.id !== user.id) {
                u.send(message);
            }
        });
    }
}