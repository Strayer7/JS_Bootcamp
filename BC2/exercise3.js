class Ship{
  constructor(name, length, orientation)
  {
    if (orientation !== 0 && orientation !== 1) { // 0 - горизонтальная, 1 - вертикальная
      throw new Error('Неверный ввод ориентации'); 
  }
    this._name = name;
    this._length = length;
    this._orientation = orientation
    this._hits = Array(this.length).fill(false);
    this._startPosition = { x: 0, y: 0 };
    
}
get name()
{
  return this._name;
}

set name(newName)
{
  this._name = newName;
}

get length()
{
  return this._length;
}

set length(newLength)
{
  this._length = newLength
}

get orientation()
{
  return this._orientation;
}

set orientation(newOrientation)
{
  this._orientation = newOrientation;
}
get hits()
    {
      return this._hits;
    }
get startPosition()
{
  return this._startPosition;
}
setPosition(x, y) {
  this._startPosition = { x, y };
}

get xShipPosition()
{
  return this._startPosition.x
}

setX(x) {
  this._startPosition.x = x;
}

get yShipPosition()
{
  return this._startPosition.y
}

setY(y) {
  this._startPosition.y = y;
}
hit(index)
{
  this._hits[index] = true;
}
isSunk()
{
  return !this._hits.includes(false);
}
get info()
{
   return `${this._name}, ${this._length}, ${this._orientation}, ${this.isSunk()}`;
}
}

class Board{
  constructor(size)
  {
    this._size = size;
    this._grid = [];
    for (let i = 0; i < size; i++) {
        this._grid[i] = Array(size).fill(null);
}
  this._ships =[];
  }

  get size()
  {
    return this._size;
  }

  set size(newSize)
  {
    this._size = newSize
  }

  get ships()
  {
    return this._ships;
  }

  set ships(newShips)
  {
    this._ships = newShips;
  }

  get grid()
  {
    return this._grid;
  }

  placeShip(ship, x, y) {
        if (ship._orientation === 0) {
            if (x >= this._size || x + ship._length > this._size || x < 0) {
                throw new Error("Out of bounds");
            }
            for (let i = 0; i < ship.length; i++) {
                if (this._grid[y][x + i] !== null) {
                    throw new Error("Клетка занята")
                }
            }
            for (let i = 0; i < ship.length; i++) {
                this._grid[y][x + i] = ship;
            }
        } else {
            if (y >= this._size || y + ship._length > this._size || y < 0) {
                throw new Error("Out of bounds");
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
      } else {
        line += 'x '; 
      }
    }
    console.log(line.trim());
  }
}
  findAvaliableCells()
  {
    let arr = [];
    for (let y = 0; y < this._size; y++) {
      for (let x = 0; x < this._size; x++) {
        if (this._grid[y][x] === null)
        {
          arr.push({"x":x,"y":y})
        }
  }
}
  return arr;
}
  recieveAttack(x,y)
{
  let result = false;
  if (x >= 0 && x < this._size && y >= 0 && y < this._size) { 
  const cell = this._grid[y][x];
  if (cell instanceof Ship)
  {
    result = true
    
    if(cell.orientation === 0)
    {
      cell.hit(x - cell.startPosition.x);
      this._grid[y][x] = 1;
    }
    else
    {
      cell.hit(y - cell.startPosition.y)
      this._grid[y][x] = 1;
    }
  }
}
  return result;
}
}

class Player {
  constructor(name,boardSize)
  {
    this._name = name;
    this._boardSize = boardSize;
    this._board = new Board(boardSize)
  }

  get name()
  {
    return this._name;
  }

  set name(name)
  {
    this._name = name;
  }

  get boardSize()
  {
    return this._boardSize;
  }

  set boardSize(size)
  {
    this._boardSize = size;
  }

  get board()
  {
    return this._board;
  }
  placeShip(shipName,length, isVertical, startPosition)
  {
    const ship = new Ship(shipName, length,isVertical)
    this._board.placeShip(ship,startPosition.x,startPosition.y)
  }
  takeTurn(opponent)
  {
    let x = parseInt(prompt("Введите удар по х"));
    let y = parseInt(prompt("Введите удар по y"))
    let result = {"x" : x,
                  "y" : y,
                  "Оппонент" : opponent
    }
    return result;
  }

}

let playerName = prompt("Введите имя оппонента");
let boardSize = Number(prompt("Введите длину доски"));

let player = new Player (playerName,boardSize)

console.log(`"${player.name}", ${player.boardSize}`)