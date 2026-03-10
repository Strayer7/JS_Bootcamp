import { Enemy } from "../enemy.js";
import { Random, Vector2 } from "../utils.js";

/*
Зомби (отображение: зеленый z): низкая ловкость; средняя сила, враждебность; высокое здоровье.
*/
export class Zombie extends Enemy {
  constructor(pos, player) {
    super(
      {
        symbol: "z",
        color: "green",
        maxHealth: 25,
        agility: 2,
        strength: 5,
      },
      4,
      pos,
      player
    );
  }

  act() {
    const directions = [
      new Vector2(0, -1),
      new Vector2(0, 1),
      new Vector2(-1, 0),
      new Vector2(1, 0),
    ];
    const diff = this.pos.sub(this._player.pos);
    const range = Math.abs(diff.x) + Math.abs(diff.y);

    if (range <= 1) {
      this.attack(this._player);
      return null;
    } else if (this.hostility >= range) {
      let res;
      if (Math.abs(diff.x) > Math.abs(diff.y)) {
        if (diff.x > 0) {
          res = directions[2];
        } else {
          res = directions[3];
        }
      } else {
        if (diff.y > 0) {
          res = directions[0];
        } else {
          res = directions[1];
        }
      }
      return res;
    } else {
      return Random.pickRandom(directions);
    }
  }
}
