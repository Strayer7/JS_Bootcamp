import { GameSession } from "./gameSession.js";
import { Vector2 } from "./utils.js";

export class Model {
  constructor() {
    this._gamesession = new GameSession();
    this._logs = [];

    this._gamesession.connect("log", (message) => {
      this._logs.push(message)
  })
}

  moveCharacter(x, y) {
    this._logs = [];
    this._gamesession.moveCharacter(new Vector2(x, y));
  };

  getGameInfo() {
    return {
      message: this._logs.join(", "),
      levelMap: this._gamesession.getLevelMap(),
      stats: this._gamesession.getStatsString(),
    };
  }
}
