export class FiniteStateMachine {
    constructor(state, initialstate) {
        this._state = state;
        this._initialstate = initialstate;
        this._transitions = {
            'PLAYER_TURN': {
                'PLAYER_MOVED': 'ENEMY_TURN',
                'DEATH': 'GAME_OVER'
            },
            'ENEMY_TURN': {
                'ENEMIES_DONE': 'PLAYER_TURN',
                'DEATH': 'GAME_OVER'
            },
            'GAME_OVER': {}
        }
    }

    transition(action) {
        const currentTransitions = this._transitions[this._state];
        if (action in currentTransitions) {
            this._state = this._transitions[this._state][action]
        }
    }

    get state() {
        return this._state;
    }

    is(state)
    {
        return this._state === state? true : false; 
    }

}
