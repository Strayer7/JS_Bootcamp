import {Enemy} from "../enemy.js"
/*
Змей-маг (отображение: белая s): очень высокая ловкость. 
Ходит по карте по диагонали, постоянно меняя сторону. 
У каждой успешной атаки есть вероятность «усыпить» игрока на один ход. Высокая враждебность.
*/
export class SnakeMage extends Enemy {
    constructor(pos) 
    {
        super({
            symbol: "s", 
            color : "white",
            maxHealth: 20,
            agility: 10,
            strength: 4,
            hostility: 3
            },
        pos)
    }
}