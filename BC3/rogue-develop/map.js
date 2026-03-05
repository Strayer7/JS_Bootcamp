import { Entity } from "./entity.js";
import { MapCell } from "./mapCell.js";
import { Room } from "./room.js";
import { Vector2, Random } from "./utils.js";


export class Map {
    constructor(hsize, vsize, roomGenerator) {
        this._hsize = hsize;
        this._vsize = vsize;
        this._objects = Array.from({ length: vsize }, () => Array(hsize).fill(null));
        this._floor = Array.from({ length: vsize }, () => Array(hsize).fill(null));
        this.fillArraysWithCells();
        this._rooms = Array.from({ length: 3 }, () => Array(3).fill(null));
        this._startRoom = null;
        if (roomGenerator)
        {
            this.generateRooms();
        }
        
    }

    get data() {
        return Array.from(this._floor);
    }

    set data(value) {
        this._floor = Array.from(value);
    }

    setCellV(pos, value) {
        this.setCell(pos.x, pos.y, value);
    }

    setCell(x, y, value) {
        this._floor[y][x] = new MapCell(x, y, value);
    }

    getCell(pos) {
        return this._floor[pos.y][pos.x];
    }

    setObjectV(pos, value) {
        this.setObject(pos.x, pos.y, value);
    }

    setObject(x, y, value) {
        this._objects[y][x] = new MapCell(x, y, value);
    }

    getObject(pos) {
        return this._objects[pos.y][pos.x];
    }

    getSize() {
        return new Vector2(this._hsize, this._vsize);
    }

    getStartRoom() {
        return this._startRoom;
    }

    getColor(cell) {
        if (cell.value == null) {
            return "{white-fg}"; 
        } else if (cell.value instanceof Entity) {
            return `{${cell.value.color}-fg}`;
        } else if (cell.value instanceof Room) {
            return "{green-fg}";
        }
    }

    getSymbol(cell) {
        if (cell.value == null) {
            return ".";   
        } else if (cell.value instanceof Entity) {
            return cell.value.symbol;
        } else if (cell.value instanceof Room) {
            if (cell.value.isBorder(cell.x, cell.y)) {
                return "#";
            }
            return ".";
        }
    }

    toString() {
        return this._floor.map(
            (row) => row.map(
                (cell) => {
                    const objCell = this.getObject(new Vector2(cell.x, cell.y));
                    if (objCell != null && objCell.value != null) {
                        cell = objCell;
                    }
                    return this.getColor(cell) + this.getSymbol(cell) + "{/}";
                }
            ).join("")
        ).join("");
    }

    generateRooms() {
        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                const room = new Room(x, y);

                this._rooms[y][x] = room;

                this.drawRoom(room);
            }
        }

        const spawn_x = Random.randInt(0, 2);
        const spawn_y = Random.randInt(0, 2);

        this._startRoom = this._rooms[spawn_y][spawn_x];
    }

    drawRoom(room) {
        for (let y = room.pos.y; y < room.pos.y + room.size.y; y++) {
            for (let x = room.pos.x; x < room.pos.x + room.size.x; x++) {
                this.setCell(x, y, room);
            }
        }
    }

    fillArraysWithCells() {
        for (let y = 0; y < this._vsize; y++) {
            for (let x = 0; x < this._hsize; x++) {
                this.setCell(x, y, null);
                this.setObject(x, y, null);
            }
        }
    }
}