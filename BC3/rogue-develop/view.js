import { Constants } from './constants.js';
import blessed from 'blessed';


export class View {
    constructor() {
        this._screen = blessed.screen({ smartCSR: true });

        this._borderBox = blessed.box({
            top: 0,
            left: 'center',
            width: Constants.SCREEN_SIZE_H + 2,
            height: Constants.SCREEN_SIZE_V + 4,
            tags: true,
            border: { type: 'line', fg: 'cyan' },
            style: { fg: 'white', bg: 'black' }
        })

        this._messageBox = blessed.box({
            top: 1,
            left: "center",
            width: Constants.SCREEN_SIZE_H,
            height: 1,
            content: "",
            tags: true,
            style: { fg: 'white' }
        })

        this._levelMap = blessed.box({
            top: 2,
            left: 'center',
            width: Constants.SCREEN_SIZE_H,
            height: Constants.SCREEN_SIZE_V,
            content: "",
            tags: true,
            style: { fg: 'white', bg: 'black' }
        });

        this._infoBox = blessed.box({
            top: 2 + Constants.SCREEN_SIZE_V,
            left: 'center',
            width: Constants.SCREEN_SIZE_H,
            height: 1,
            content: "",
            tags: true,
            style: { fg: 'white' }
        })

        this._screen.append(this._borderBox)
        this._screen.append(this._messageBox)
        this._screen.append(this._levelMap)
        this._screen.append(this._infoBox)

        this.mapInput(['q', 'escape', 'C-c'], () => process.exit(0))
    }

    mapInput(keys, fn) {
        this._screen.key(keys, fn);
    }

    drawScreen(gameInfo) {
        this._messageBox.setContent(gameInfo.message);
        this._levelMap.setContent(gameInfo.levelMap);
        this._infoBox.setContent(gameInfo.stats);
        this._screen.render();
    }
}
