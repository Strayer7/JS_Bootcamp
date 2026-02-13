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

setX(x) {
  this._startPosition.x = x;
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

let sName = prompt("Введи имя");
let sLength = Number(prompt("Введи длину"));
let sOrientation = Number(prompt("Введи ориентацию (0 = Горизонтальная, 1 = Вертикальная)"))


let newShip = new Ship(sName,sLength,sOrientation);
newShip.hit(0)
newShip.hit(1)
alert(newShip.info);
