import { Map } from "../map.js";
import { Room } from "../room.js";
import { Character } from "../character.js";
import { Vector2 } from "../utils.js";
import { Zombie } from "../enemies/zombie.js";

export class SimpleTestLevel {
    constructor() {
        this._map = new Map(80, 25, false);
        
        this.createRoom();
        
        this.createCharacter();
    }
    
    createRoom() {
        const room = new Room(0, 0);
        
        const startPos = new Vector2(27, 7);
        const roomSize = new Vector2(23, 8);
        
        room._pos = startPos;
        room._size = roomSize;
        room._end = startPos.add(roomSize).sub(new Vector2(1, 1));
        
        this._map.drawRoom(room);
    }
    
    createCharacter() {
        const playerPos = new Vector2(30, 10);
        const enemyPos = new Vector2 (33,11);
        this._character = new Character(playerPos, 100);
        this._zomblie = new Zombie(enemyPos);
        
        this._map.setObjectV(playerPos, this._character);
        this._map.setObjectV(enemyPos, this._zomblie);
    }
    
    getMap() {
        return this._map;
    }
    
    getCharacter() {
        return this._character;
    }
}