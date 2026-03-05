import { Constants } from "./constants.js";
import { Map } from "./map.js";
import { Vector2 } from "./utils.js";
import { Room } from "./room.js";

export class Level {
    constructor() {
        this._map = new Map(Constants.SCREEN_SIZE_H, Constants.SCREEN_SIZE_V,true);
    }

    getMap() {
        return this._map;
    }

    getStringMap() {
        return this._map.toString();
    }

    setCharacter(pos, char) {
        this._map.setObjectV(pos, char);
    }

    moveObject(pos, direction) {
        const new_pos = pos.add(direction);
        if (!new_pos.in(new Vector2(0, 0), this._map.getSize())) {
            return;
        }
        const cell = this._map.getCell(new_pos);
        if (cell != null) {
            if (cell.value instanceof Room) {
                if (cell.value.isBorder(new_pos.x, new_pos.y)) {
                    return;
                }
            } else {
                return;
            }
        }
        const obj = this._map.getObject(pos).value;
        this._map.setObjectV(pos, null);
        this._map.setObjectV(new_pos, obj);
        obj.pos = new_pos;
    }
}