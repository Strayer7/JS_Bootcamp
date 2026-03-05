import {Enemy} from "../enemy.js"
/*
Зомби (отображение: зеленый z): низкая ловкость; средняя сила, враждебность; высокое здоровье.
*/
export class Zombie extends Enemy {
    constructor(pos) 
    {
        super({
            symbol: "z", 
            color : "green",
            maxHealth: 25,
            agility: 2,
            strength: 5,
            hostility: 2
        }, pos)
    }
    random
}