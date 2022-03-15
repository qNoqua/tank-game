import { Tank } from "./Tank";
import { Battlefield } from "./Battlefield";
import { BattlefieldController } from "./Controllers/BattlefieldController";
import { Connection } from "./server/Connection";
import "./utils/helpers.js"
import "./styles/styles.scss"
import { BattlefieldViews } from "./views/BattlefieldView";
const tank1 = new Tank('tank_1');
const tank2 = new Tank('tank_2');

const connection = new Connection();
const areaSize = connection.whatIsThisSize();
console.log(areaSize);

areaSize.then(function(size){
    let _size = size;
    console.log(size);
    let positionY = Math.floor(_size.y/2);
    let positionX_1 = 0;
    let positionX_2 = _size.x-1;
    console.log('Area Ready');
    const battlefield = new Battlefield(_size.y, _size.x);
    new BattlefieldController(battlefield, tank1, { y: positionY, x: positionX_1, control: controls1, direction: 'down'})
    new BattlefieldController(battlefield, tank2, { y: positionY, x: positionX_2, control: controls2, direction: 'top'})
    const battlefieldViews = new BattlefieldViews
    setInterval(() => {
        battlefieldViews.update(battlefield.coordinates)
    }, 150)
    
})
.catch(function(e){
    console.error('Area Error');
    console.log(e);
})


const controls1 = {
    UP: 'KeyW',
    DOWN: 'KeyS',
    LEFT: 'KeyA',
    RIGHT: 'KeyD',
    FIRE: 'Space',
};
const controls2 = {
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    FIRE: 'Enter',
};



// fetch('/server/Server.js')
//     .then((data) => {
//         console.log(data);
//     })





// console.log(tank1.healh)
// console.log(tank2.fire)

// function battle (tank1 , tank2) {
//     let count_1 = tank1.bullets;
//     let count_2 = tank2.bullets;
//     let tank1HP = tank1.healh;
//     let tank2HP = tank2.healh;
//     for (; count_1 > 0|| count_2 > 0; count_1--, count_2--)  {
//         console.log(`Танк 1 делает выстрел! Осталось снарядов: ${count_1}`)
//         tank2HP -= tank1.fire;
//         if (tank2HP <= 0){
//             console.log('У Танка 2 не оталось HP! Победил Танк 1!');
//             break;
//         } 
//         console.log(`У танка 2 остается ${tank2HP}HP`)
//         console.log(`Танк 2 делает выстрел! Осталось снарядов: ${count_2}`)
//         tank1HP -= tank2.fire;
//         if (tank1HP <= 0){
//             console.log('У Танка 1 не оталось HP! Победил Танк 2!');
//             break;
//         }
//         console.log(`У танка 1 остается ${tank1HP}HP`);
//     }

// }

// battle(tank1, tank2);

/* import { BattlefieldViews } from "../views/BattlefieldView";

export class BattlefieldController {

    constructor(battlefield, tank, config) {
        this.battlefield = battlefield;
        this.tank = tank;
        this.config = config;
        this.initBattlefieldView();
        this.player = battlefield.addPlayer(tank, config);
        this.updatePlayer();
        this.eventListener();
    }
    initBattlefieldView() {
        this.battlefieldView = new BattlefieldViews;
        this.battlefieldView.init(this.battlefield.coordinates)
    }
    updatePlayer() {
        this.battlefieldView.update(this.battlefield.coordinates);
    }
    eventListener() {
        document.addEventListener('keydown', (e) => {
            if (e.code === 'ArrowUp') {
                this.moveTop();
                this.updatePlayer();
            }
            if (e.code === 'ArrowDown') {
                this.moveDown();
                this.updatePlayer();
            }
            if (e.code === 'ArrowLeft') {
                this.moveLeft();
                this.updatePlayer();
            }
            if (e.code === 'ArrowRight') {
                this.moveRight();
                this.updatePlayer();
            }
        })
    }
    updateConfig(result) {
        if (result !== 'error') {
            this.config.x = result.coordinates.x;
            this.config.y = result.coordinates.y;
        }
    }
    moveTop() {
        const { x, y } = this.config;
        const result = this.battlefield.setTankPosition(this.player.id, { x, y: y - 1 });
        this.updateConfig(result);
    }
    moveDown() {
        const { x, y } = this.config;
        const result = this.battlefield.setTankPosition(this.player.id, { x, y: y + 1 });
        this.updateConfig(result);
    }
    moveLeft() {
        const { x, y } = this.config;
        const result = this.battlefield.setTankPosition(this.player.id, { x: x - 1, y });
        this.updateConfig(result);
    }
    moveRight() {
        const { x, y } = this.config;
        const result = this.battlefield.setTankPosition(this.player.id, { x: x + 1, y });
        this.updateConfig(result);
    }
}
 */