import { Entity } from "./entity.js";

export class Enemy extends Entity {
  constructor(
    { symbol, color, maxHealth, agility, strength },
    hostility,
    pos,
    player
  ) {
    super({ symbol, color, maxHealth, agility, strength });

    this._pos = pos;
    this._hostility = hostility;
    this._isDead = false;
    this._player = player;
  }

  get pos() {
    return this._pos;
  }
  set pos(value) {
    this._pos = value;
  }
  get hostility() {
    return this._hostility;
  }
  get isDead() {
    return this._isDead;
  }

  takeDamage(amount) {
    super.takeDamage(amount);
    if (this.health === 0) this._isDead = true;
  }

  attack(target) {
    const evadeChance = target.agility / (target.agility + this.agility);
    if (Math.random() < evadeChance) {
      this._emit("log", "Персонаж уклонился");
    } else {
      target.takeDamage(this._strength);
    }
  }
}
