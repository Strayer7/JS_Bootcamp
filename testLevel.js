import { Map } from "./map.js";
import { Room } from "./room.js";
import { Character } from "./character.js";
import { Vector2 } from "./utils.js";
import { Zombie } from "./enemy.js";

// Создаем простой тестовый уровень
export class SimpleTestLevel {
    constructor() {
        // 1. Создаем карту размером 80x25 (как в константах)
        this._map = new Map(80, 25, false);
        
        // 2. Создаем комнату
        this.createRoom();
        
        // 3. Создаем персонажа
        this.createCharacter();
    }
    
    createRoom() {
        // Создаем новую комнату
        const room = new Room(0, 0);
        
        // Задаем позицию комнаты (отступ от края)
        const startPos = new Vector2(27, 7);
        // Задаем размер комнаты
        const roomSize = new Vector2(23, 8);
        
        // Устанавливаем параметры комнаты
        room._pos = startPos;
        room._size = roomSize;
        room._end = startPos.add(roomSize).sub(new Vector2(1, 1));
        
        // Рисуем комнату на карте
        this._map.drawRoom(room);
    }
    
    createCharacter() {
        // Создаем персонажа в центре комнаты
        const playerPos = new Vector2(30, 10); // Центр примерно: x=30, y=10
        const enemyPos = new Vector2 (33,11);
        this._character = new Character(playerPos, 100);
        this._zomblie = new Zombie(enemyPos);
        
        // Размещаем персонажа на карте
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