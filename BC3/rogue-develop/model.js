import { GameSession } from "./gameSession.js";
import { Vector2 } from "./utils.js";


export class Model {
    constructor() {
        this._gamesession = new GameSession();
    }

    moveCharacter(x, y) {
        this._gamesession.moveCharacter(new Vector2(x, y));
    }

    getGameInfo() {
        return {
            message: "Empty Message",
            levelMap: this._gamesession.getLevelMap(),
            stats: this._gamesession.getStatsString(),
        }
    }
}
