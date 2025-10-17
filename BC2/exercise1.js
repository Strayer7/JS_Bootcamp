class Ship {
    constructor(name, length, pos, x,y)
    {
        this._name = name;
        this._length = length;
        this._pos = pos;
        this._hits = Array(length).fill(false);
        this._startPosition = {x,y};
    }

    get name()
    {
        return this._name;
    }

    set name(name)
    {
        this._name = name;
    }

    get length()
    {
        return this._length;
    }
    set length(length)
    {
        this._length = length;
    }
    get pos()
    {
        return this._pos;
    }
    set pos(pos)
    {
        this._pos = pos;
    }
    get startPosition()
    {
        return this._startPosition;
    }
    set startPosition(value) { 
        this._startPosition.x = value.x;
        this._startPosition.y = value.y;
    }

    hit(index)
    {
        this._hits[index] = true;
    }

    isSunk(shipHits)
    {  
        let check = true;
        for(let i = 0; i < shipHits.length; i++)
        {
            if(shipHits[i] == false)
            {
                check = false;
                break;
            }
        }
        return check;
    }

}
//let Shipname = prompt("NAME");
//let length = Number(prompt("LENGTH"));
//let pos =  Number(prompt("Pos"));
//let x =  Number(prompt("x"));
//let y = Number(prompt("y"));

let ShipName = "Ship";
let length = 2;
let pos = 1;

let test = new Ship(ShipName, length, pos);
test.hit(0);
test.hit(1);
console.log(`${test.name}, ${test.length}, ${test.pos}, ${test.isSunk()}`);