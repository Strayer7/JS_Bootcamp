

export class GameObject {
    constructor(signals) {
        this._signals = {};
        for (const signal of signals) {
            this._signals[signal] = Array();
        }
    }

    connect(signal, fn) {
        this._signals[signal].push(fn);
    }

    _emit(signal) {
        // TODO: Add sugnal existance check
        for (const receiver of this._signals[signal]) {
            receiver();
        }
    }
}