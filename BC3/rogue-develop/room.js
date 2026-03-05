import { Vector2, Random } from "./utils.js";


export class Room {
    constructor(x, y) {
        const base_x = 1 + 27 * x;
        const base_y = 1 + 8 * y;
        const min_room_size = new Vector2(12, 4);
        const max_room_size = new Vector2(24, 7);
        this._start = new Vector2(base_x, base_y);
        this._size = Random.randVector2(min_room_size, max_room_size);
        this._pos = Random.randVector2(this._start, this._start.add(max_room_size).sub(this._size));
        this._end = this._pos.add(this._size).sub(new Vector2(1, 1));
    }

    get pos() {
        return this._pos; 
    }

    get size() {
        return this._size;
    }

    get end() {
        return this._end;
    }

    isBorder(x, y) {
        if (x == this._pos.x || y == this._pos.y || x == this._end.x || y == this._end.y) {
            return true;
        }
        return false;
    }
 }