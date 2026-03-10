import { Entity } from "./entity.js";
import { Weapon } from "./weapon.js";

export class Character extends Entity {
  constructor(pos, maxHealth) {
    super({ symbol: "o", color: "blue" });

    this._pos = pos;

    this._equippedWeapon = new Weapon("mace");
    this._treasure = 0;
  }

  get pos() {
    return this._pos;
  }

  set pos(value) {
    this._pos = value;
  }

  get treasure() {
    return this._treasure;
  }

  attack(target) {
    const evadeChance = target.agility / (target.agility + this.agility);
    if (Math.random() < evadeChance) {
      this._emit("log", "Противник уклонился");
    } else {
      target.takeDamage(this._strength);
      this._emit("log", `Персонаж нанёс ${this._strength} урона`);
    }
  }
}
