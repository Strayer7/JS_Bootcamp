

export class MapCell {
    constructor(x, y, value) {
        this._x = x;
        this._y = y;
        this._value = value;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get value() {
        return this._value;
    }
}