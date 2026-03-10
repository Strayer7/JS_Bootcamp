import { Constants } from "./constants.js";
import { Map } from "./map.js";
import { Vector2 } from "./utils.js";
import { Room } from "./room.js";
import { Corridor } from "./corridor.js";
import { Enemy } from "./enemy.js";

export class Level {
  constructor() {
    this._map = new Map(Constants.SCREEN_SIZE_H, Constants.SCREEN_SIZE_V);
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

  setEnemy(pos, enemy) {
    this._map.setObjectV(pos, enemy);
  }

  moveObject(pos, direction) {
    const new_pos = pos.add(direction);
    if (!new_pos.in(new Vector2(0, 0), this._map.getSize())) {
      return;
    }

    const targetObj = this._map.getObject(new_pos);
    if (targetObj.value instanceof Enemy) {
      const attacker = this._map.getObject(pos).value;
      attacker.attack(targetObj.value)
      return;
    }
    const currentCell = this._map.getCell(pos);
    const newCell = this._map.getCell(new_pos);
    if (newCell.value != null) {
      if (newCell.value instanceof Room) {
        if (newCell.value.isBorder(new_pos.x, new_pos.y)) {
          return;
        }
      } else if ((!newCell.value) instanceof Corridor) {
        return;
      }
    } else if (currentCell.value instanceof Corridor) {
      return;
    }
    const obj = this._map.getObject(pos).value;
    this._map.setObjectV(pos, null);
    this._map.setObjectV(new_pos, obj);
    obj.pos = new_pos;
  }
  removeObject(pos) {
    this._map.removeObject(pos);
  }
}
