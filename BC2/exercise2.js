class Ship{
  constructor(name, length, orientation)
  {
    if (orientation !== 0 && orientation !== 1) {
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
    ship.setX(x);
    ship.setY(y)
  }
}
