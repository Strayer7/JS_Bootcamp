import { GameObject } from "./gameObject.js";

export class Entity extends GameObject {
    constructor({
        symbol,
        color = "white",
        maxHealth = 100,
        agility = 10,
        strength = 10
    }) {
        super(
            ["dead"]
        );

        this._symbol = symbol;
        this._color = color;

        this._maxHealth = maxHealth;
        this._currentHealth = maxHealth;
        this._agility = agility;
        this._strength = strength;
    }

    get symbol() {
        return this._symbol;
    }

    set symbol(value) {
        this._symbol = value;
    }

    get color() {
        return this._color;
    }

    set color(value) {
        this._color = value;
    }

    get health() {
        return this._currentHealth;
    }

    get maxHealth() {
        return this._maxHealth;
    }

    get agility() {
        return this._agility;
    }

    get strength() {
        return this._strength;
    }

    takeDamage(amount) {
        this._currentHealth = Math.max(this._currentHealth - amount, 0);
        if (this._currentHealth == 0) {
            this._emit("dead");
        }
    }
}