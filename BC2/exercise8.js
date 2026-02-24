class Ship {
    constructor(name, length, orientation) {
        if (orientation !== 0 && orientation !== 1) {
            throw new Error('Неверный ввод ориентации');
        }
        this._name = name;
        this._length = length;
        this._orientation = orientation;
        this._hits = Array(this._length).fill(false);
        this._startPosition = {
            x: 0,
            y: 0
        };
    }

    get name() {
        return this._name;
    }
    set name(newName) {
        this._name = newName;
    }

    get length() {
        return this._length;
    }
    set length(newLength) {
        this._length = newLength;
    }

    get orientation() {
        return this._orientation;
    }
    set orientation(newOrientation) {
        this._orientation = newOrientation;
    }

    get hits() {
        return this._hits;
    }
    get startPosition() {
        return this._startPosition;
    }

    setPosition(x, y) {
        this._startPosition = {
            x,
            y
        };
    }

    get xShipPosition() {
        return this._startPosition.x;
    }
    setX(x) {
        this._startPosition.x = x;
    }

    get yShipPosition() {
        return this._startPosition.y;
    }
    setY(y) {
        this._startPosition.y = y;
    }

    hit(index) {
        if (index >= 0 && index < this._length) {
            this._hits[index] = true;
        }
    }

    isSunk() {
        return !this._hits.includes(false);
    }

    get info() {
        return `${this._name}, ${this._length}, ${this._orientation}, ${this.isSunk()}`;
    }
}

class Board {
    constructor(size) {
        this._size = size;
        this._grid = [];
        for (let i = 0; i < size; i++) {
            this._grid[i] = Array(size).fill(null);
        }
        this._ships = [];
    }

    get size() {
        return this._size;
    }
    set size(newSize) {
        this._size = newSize;
    }

    get ships() {
        return this._ships;
    }
    set ships(newShips) {
        this._ships = newShips;
    }

    get grid() {
        return this._grid;
    }

    placeShip(ship, x, y) {
        if (ship._orientation === 0) {
            if (x < 0 || x + ship._length > this._size || y < 0 || y >= this._size) {
                throw new Error("Вне поля");
            }
            for (let i = 0; i < ship.length; i++) {
                if (this._grid[y][x + i] !== null) {
                    throw new Error("Клетка занята");
                }
            }
            for (let i = 0; i < ship.length; i++) {
                this._grid[y][x + i] = ship;
            }
        } else {
            if (y < 0 || y + ship._length > this._size || x < 0 || x >= this._size) {
                throw new Error("Вне поля");
            }
            for (let i = 0; i < ship.length; i++) {
                if (this._grid[y + i][x] !== null) {
                    throw new Error("Клетка занята");
                }
            }
            for (let i = 0; i < ship.length; i++) {
                this._grid[y + i][x] = ship;
            }
        }
        ship.setPosition(x, y);
        this._ships.push(ship);
    }

    display() {
        for (let y = 0; y < this._size; y++) {
            let line = '';
            for (let x = 0; x < this._size; x++) {
                const cell = this._grid[y][x];
                if (cell === null) {
                    line += 'o ';
                } else if (cell instanceof Ship) {
                    line += 's ';
                } else if (cell === 1) {
                    line += 'x '; // попадание
                }
            }
            console.log(line.trim());
        }
    }

    findAvaliableCells() {
        let arr = [];
        for (let y = 0; y < this._size; y++) {
            for (let x = 0; x < this._size; x++) {
                if (this._grid[y][x] === null) {
                    arr.push({
                        x,
                        y
                    });
                }
            }
        }
        return arr;
    }

    receiveAttack(x, y) {
        let hit = false;

        if (x >= 0 && x < this._size && y >= 0 && y < this._size) {
            const cell = this._grid[y][x];
            if (cell instanceof Ship) {
                if (cell.orientation === 0) {
                    cell.hit(x - cell.startPosition.x);
                } else {
                    cell.hit(y - cell.startPosition.y);
                }
                this._grid[y][x] = 1; // отметка попадания
                hit = true;
            }
        }
        return hit;
    }

    areAllShipsSunk() {
        return this._ships.every(ship => ship.isSunk());
    }
}

class Player {
    constructor(name, boardSize) {
        this._name = name;
        this._boardSize = boardSize;
        this._board = new Board(boardSize);
    }

    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }

    get boardSize() {
        return this._boardSize;
    }
    set boardSize(size) {
        this._boardSize = size;
    }

    get board() {
        return this._board;
    }

    placeShip(shipName, length, isVertical, startPosition) {
        const ship = new Ship(shipName, length, isVertical);
        this._board.placeShip(ship, startPosition.x, startPosition.y);
    }

    takeTurn(opponent) {
        let x = parseInt(prompt(`Игрок ${this.name} вводит удар по X`));
        let y = parseInt(prompt(`Игрок ${this.name} вводит удар по Y`));
        return {
            x,
            y,
            opponent
        };
    }
}

class HumanPlayer extends Player {
    constructor(name, boardSize) {
        super(name, boardSize)
    }

    // placeShip(shipName, length, isVertical, startPosition) {
    //     const ship = new Ship(shipName, length, isVertical);
    //     this._board.placeShip(ship, startPosition.x, startPosition.y);
    // }

    // takeTurn(opponent) {
    //     let x = parseInt(prompt("Введите удар по x"));
    //     let y = parseInt(prompt("Введите удар по y"));
    //     return { x, y, opponent };
    //}
}

class AIPlayer extends Player {
    constructor(name, boardSize) {
        super(name, boardSize)
        this._hitBoard = [];
        for (let i = 0; i < boardSize; i++) {
            this._hitBoard[i] = Array(boardSize).fill(0);
        }
    }

    randomNumberBetween(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    }


    placeShip(maxShipLength, maxShipCount) {
        for (let i = 0; i < maxShipCount; i++) {
            const shipName = `Ai Ship ${this.randomNumberBetween(0, 9)}`;
            const length = this.randomNumberBetween(1, maxShipLength);
            const isVertical = this.randomNumberBetween(0, 1);
            const ship = new Ship(shipName, length, isVertical);

            while (true) {
                const emptyCells = this.board.findAvaliableCells();
                if (emptyCells.length === 0) break;

                const index = this.randomNumberBetween(0, emptyCells.length - 1);
                const {
                    x,
                    y
                } = emptyCells[index];

                try {
                    this.board.placeShip(ship,x,y);
                    break;
                } catch (e) {}
            }
        }
   }
    findNotAttackedCells() {
        let arr = [];
        for (let y = 0; y < this.boardSize; y++) {
            for (let x = 0; x < this.boardSize; x++) {
                if (this._hitBoard[y][x] === 0) {
                    arr.push({
                        x,
                        y
                    });
                }
            }
        }
        return arr;
    }

    takeTurn(opponent) {
        let availableCells = this.findNotAttackedCells();

        const index = this.randomNumberBetween(0, availableCells.length - 1);
        const {
            x,
            y
        } = availableCells[index];
        this._hitBoard[y][x] = 1;
        return {
            x,
            y,
            opponent
        };
    }
}

class App {
    constructor(boardSize, shipMaxLength, maxShipCount) {
        this._boardSize = boardSize;
        this._shipMaxLength = shipMaxLength;
        this._maxShipCount = maxShipCount;
        this._firstPlayer = null;
        this._secondPlayer = null;
    }

    get boardSize() {
        return this._boardSize;
    }
    set boardSize(size) {
        this._boardSize = size;
    }

    get shipMaxLength() {
        return this._shipMaxLength;
    }
    set shipMaxLength(length) {
        this._shipMaxLength = length;
    }

    get maxShipCount() {
        return this._maxShipCount;
    }
    set maxShipCount(n) {
        this._maxShipCount = n;
    }

    shipArrangement(player, shipCount, maxShipLength) {
        let i = 0;
        while (i < shipCount) {
            let shipName = prompt(`Игрок ${player.name} Введите имя корабля`)
            let shipLength = Number(prompt("Введите длину корабля"));
            if (shipLength <= 0 || shipLength > maxShipLength) {
                alert("Некорректная длина корабля!");
                continue;
            }
            let shipOrientation = Number(prompt("Ориентация (0=горизонтальная, 1=вертикальная):"));
            if (shipOrientation !== 0 && shipOrientation !== 1) {
                alert("Ориентация должна быть 0 или 1!");
                continue;
            }
            let shipX = Number(prompt("Расстановка кораблей: Координата X:"));
            let shipY = Number(prompt("Расстановка кораблей: Координата Y:"));

            try {
                player.placeShip(`${shipName} ${i + 1}`, shipLength, shipOrientation, {
                    x: shipX,
                    y: shipY
                });
                i++;
            } catch (e) {
                alert("Ошибка размещения: " + e.message);
            }
        }
    }
    delay(ms)
    {
        return new Promise(resolve => setTimeout(resolve,ms));
    }

    async run() {

        let name1 = prompt("Введите имя первого игрока:");
        this._firstPlayer = new HumanPlayer(name1, this._boardSize);

        let whichOpponent = Number(prompt("Выбери оппонента: 0 - компьютер, 1 - человек"));
        if (whichOpponent) {
            this.shipArrangement(this._firstPlayer, this._maxShipCount, this._shipMaxLength);
             let name2 = prompt("Введите имя второго игрока:");
            this._secondPlayer = new HumanPlayer(name2, this._boardSize);
            this.shipArrangement(this._secondPlayer, this._maxShipCount, this._shipMaxLength);
        } else if (!whichOpponent) {
            this.shipArrangement(this._firstPlayer, this._maxShipCount, this._shipMaxLength);
            this._secondPlayer = new AIPlayer("AIPlayer", this._boardSize);
            this._secondPlayer.placeShip(this._shipMaxLength,this._maxShipCount);
        }
        
        let currentPlayer = this._firstPlayer;
        let opponent = this._secondPlayer;

        while (true) {
            await this.delay(1000);
            let attack = currentPlayer.takeTurn(opponent);        
            opponent.board.receiveAttack(attack.x, attack.y);
            console.log(`${currentPlayer.name} (${attack.x},${attack.y})`)
            if (opponent.board.areAllShipsSunk()) {
                console.log(`${currentPlayer.name} `);
                break;
            }
            [currentPlayer, opponent] = [opponent, currentPlayer];
        }
    }
}

let game = new App(5, 3, 1);
game.run();