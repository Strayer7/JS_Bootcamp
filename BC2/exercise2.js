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
    this._ships.push(newShips);
  }

  get grid()
  {
    return this._grid;
  }

  placeShip(ship,x,y)
  {
    ship.setPosition(x, y); //переписать
    this._ships.push(ship);
  }
  display() {
  for (let y = 0; y < this._size; y++) {
    let line = '';
    for (let x = 0; x < this._size; x++) {
      const cell = this._grid[y][x];
      if (cell === null) {
        line += 'o ';
      } else if (cell === 1) {
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
//дописать
}
}


let test = new Ship("Тест",3,1)
let board = new Board(5)

board.placeShip(test,0,0)

console.log(board.findAvaliableCells())
