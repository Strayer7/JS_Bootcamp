import { GameObject } from "./gameObject.js";
import { Character } from "./character.js";
import { Level } from "./level.js";
import { Random, Vector2 } from "./utils.js";
import { FiniteStateMachine } from "./fsm.js";
import { Zombie } from "./enemies/zombie.js";

export class GameSession extends GameObject {
  constructor() {
    super(["log"]);

    this._levelNumber = 1;
    this._currentLevel = new Level();

    this.characterSpawn();
    this.enemySpawn();

    this._fsm = new FiniteStateMachine("PLAYER_TURN", "PLAYER_TURN");
  }

  characterSpawn() {
    const startRoom = this._currentLevel.getMap().getStartRoom();
    const playerPos = Random.randVector2(
      startRoom.pos.add(new Vector2(1, 1)),
      startRoom.end.sub(new Vector2(1, 1))
    );
    this._character = new Character(playerPos, 100);
    this._currentLevel.setCharacter(this._character.pos, this._character);
    this._character.connect("log", (msg) => this._emit("log", msg));
  }

  enemySpawn() {
    const rooms = this._currentLevel.getMap().getRooms();
    const enemyRoom = rooms[1];
    const enemyPos = Random.randVector2(
      enemyRoom.pos.add(new Vector2(1, 1)),
      enemyRoom.end.sub(new Vector2(1, 1))
    );
    this._zombie = new Zombie(enemyPos, this._character);
    this._zombie.connect("log", (msg) => this._emit("log", msg));

    this._zombie.connect("dead", () => {
      this._currentLevel.removeObject(this._zombie.pos);
      this._emit("log", "Зомби умер!");
    });

    this._currentLevel.setCharacter(enemyPos, this._zombie);
  }

  moveCharacter(dir) {
    if (!this._fsm.is("PLAYER_TURN")) return;
    this._currentLevel.moveObject(this._character.pos, dir);
    this._fsm.transition("PLAYER_MOVED");
    this.enemyTurn();
  }

  enemyTurn() {
    const currentMap = this._currentLevel.getMap();
    const enemies = currentMap.getEnemies();
    for (let i = 0; i < enemies.length; i++) {
      if (enemies[i].isDead) continue;
      const dir = enemies[i].act();
      if (!dir) continue;
      this._currentLevel.moveObject(enemies[i].pos, dir);
    }
    this._fsm.transition("ENEMIES_DONE");
  }

  getLevelMap() {
    return this._currentLevel.getStringMap();
  }

  getStatsString() {
    let stats = `Level: ${this._levelNumber}`;
    stats += `\tTreasure: ${this._character.treasure}`;
    stats += `\tHp: ${this._character.health}(${this._character.maxHealth})`;
    stats += `\tStr: ${this._character.strength}`;
    stats += `\tAgl: ${this._character.agility}`;
    return stats;
  }

  get character() {
    return this._character;
  }

  get zombie() {
    return this._zombie;
  }
}
