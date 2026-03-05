
export class Controller {
    constructor(model, view) {
        this._model = model;
        this._view = view;

        this._mapInputs();
    }

    _mapInputs() {
        this._view.mapInput(['w'], () => this._model.moveCharacter(0, -1));
        this._view.mapInput(['a'], () => this._model.moveCharacter(-1, 0));
        this._view.mapInput(['s'], () => this._model.moveCharacter(0, 1));
        this._view.mapInput(['d'], () => this._model.moveCharacter(1, 0));
    }

    startGame() {
        setInterval(() => {
            this._view.drawScreen(this._model.getGameInfo());
        }, 10)
    }
}