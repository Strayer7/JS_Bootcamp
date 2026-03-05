import { Character } from "./character.js";
import { Level } from "./level.js";
import { Random, Vector2 } from "./utils.js";
import { FiniteStateMachine } from "./fsm.js";


export class GameSession {
    constructor() {
        this._levelNumber = 1;
        this._currentLevel = new Level();
        const startRoom = this._currentLevel.getMap().getStartRoom();
        const playerPos = Random.randVector2(
            startRoom.pos.add(new Vector2(1, 1)),
            startRoom.end.sub(new Vector2(1, 1))
        );
        this._character = new Character(playerPos, 100);

        this._currentLevel.setCharacter(this._character.pos, this._character);

        this._fsm = new FiniteStateMachine("PLAYER_TURN","PLAYER_TURN")
    }

    moveCharacter(dir) {
    if (!this._fsm.is('PLAYER_TURN')) return
    
    this._currentLevel.moveObject(this._character.pos, dir);
    this._fsm.transition('PLAYER_MOVED');
    this.enemyTurn();
}

    enemyTurn()
    {
        this._fsm.transition(`ENEMIES_DONE`)
    }

    getLevelMap() {
        return this._currentLevel.getStringMap();
    }

    getStatsString() {
        let stats = `Level: ${this._levelNumber}`
        stats += `\tTreasure: ${this._character.treasure}`
        stats += `\tHp: ${this._character.health}(${this._character.maxHealth})`
        stats += `\tStr: ${this._character.strength}`
        stats += `\tAgl: ${this._character.agility}`
        return stats;
    }
}
