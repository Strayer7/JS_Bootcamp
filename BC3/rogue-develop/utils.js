
export class Vector2 {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    add(other) {
        return new Vector2(this._x + other.x, this._y + other.y);
    }
    
    sub(other) {
        return new Vector2(this._x - other.x, this._y - other.y);
    }

    in(pos1, pos2) {
        if (this._x >= pos1.x && this._x < pos2.x && this._y >= pos1.y && this._y < pos2.y) {
            return true;
        }
        return false;
    }
}


export class Random {
    static randInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static randVector2(min, max) {
        const x = this.randInt(min.x, max.x);
        const y = this.randInt(min.y, max.y);

        return new Vector2(x, y);
    }
}