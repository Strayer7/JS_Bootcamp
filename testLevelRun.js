import { View } from './view.js';
import { Controller } from './controller.js';
import { SimpleTestLevel } from './testLevel.js';
import { Vector2 } from './utils.js';
import { Room } from './room.js';

class TestModel {
    constructor() {
        this._level = new SimpleTestLevel();
        this._character = this._level.getCharacter();
    }

    moveCharacter(dx, dy) {
        const direction = new Vector2(dx, dy);

        
        const currentPos = this._character.pos;
        const newPos = currentPos.add(direction);
        
        // Простая проверка границ и стен (упрощенная копия логики из Level.moveObject)
        const map = this._level.getMap();
        const mapSize = map.getSize();

        if (!newPos.in(new Vector2(0, 0), mapSize)) return;

        const cell = map.getCell(newPos);
        if (cell != null) {
            if (cell.value instanceof Room) { 
                 if (cell.value.isBorder(newPos.x, newPos.y)) return;
            } else {
                if (cell.value !== null && !(cell.value instanceof Room)) return;
            }
        }

        map.setObjectV(currentPos, null);
        map.setObjectV(newPos, this._character);
        this._character.pos = newPos;
    }

    getGameInfo() {
        return {
            message: "Тестовый уровень! WASD - ходить, Q - выход",
            levelMap: this._level.getMap().toString(),
            stats: `Игрок: (${this._character.pos.x}, ${this._character.pos.y}) | HP: ${this._character.health}`
        };
    }
}


const model = new TestModel();
const view = new View();
const controller = new Controller(model, view);


controller.startGame();