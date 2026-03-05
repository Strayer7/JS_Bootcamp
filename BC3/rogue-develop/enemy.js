import { Entity } from "./entity.js";

export class Enemy extends Entity {
    constructor({symbol,color, maxhealth,agility,strength}, hostility, pos)
    {
        super({symbol,color, maxhealth,agility,strength})

        this._pos = pos;
        this._hostility = hostility;
        this._isDead = false;
    }

    get pos() { return this._pos; }
    get hostility() { return this._hostility; }
    get isDead() {return this._isDead}
    
    takeDamage(amount) {
        super.takeDamage(amount);
        if (this.health === 0) this._isDead = true;
    }
}