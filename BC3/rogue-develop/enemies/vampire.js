import {Enemy} from "../enemy.js"
/*
Вампир (отображение: красная v): высокая ловкость, враждебность и здоровье; средняя сила.
Отнимает некоторое количество максимального уровня здоровья игроку при успешной атаке. 
Первый удар по вампиру — всегда промах.
*/
export class Vampire extends Enemy {
    constructor(pos) 
    {
        super({
            symbol: "v", 
            color : "red",
            maxHealth: 50,
            agility: 10,
            strength: 5,
            hostility: 3
        }, pos)
    }
    }