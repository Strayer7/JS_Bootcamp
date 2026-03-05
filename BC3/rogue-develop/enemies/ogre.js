import {Enemy} from "../enemy.js"
/*
Огр (отображение: желтый O): ходит по комнате на две клетки.
Очень высокая сила и здоровье, но после каждой атаки отдыхает один ход, затем гарантированно контратакует; низкая ловкость; средняя враждебность.
*/
export class Ogre extends Enemy {
    constructor(pos) 
    {
        super({
            symbol: "o", 
            color : "yellow",
            maxHealth: 60,
            agility: 4,
            strength: 7,
            hostility: 2
        }, pos)
    }
}