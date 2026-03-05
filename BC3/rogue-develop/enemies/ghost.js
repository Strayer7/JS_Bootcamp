import {Enemy} from "../enemy.js"
/*
Привидение (отображение: белый g): высокая ловкость; низкая сила, враждебность и здоровье.
Постоянно телепортируется по комнате и периодически становится невидимым, пока игрок не вступил в бой.
*/
export class Ghost extends Enemy {
    constructor(pos)
    {
        super({
            symbol: "g", 
            color : "white",
            maxHealth: 15,
            agility: 10,
            strength: 3,
            hostility: 1
        },pos)
}
}