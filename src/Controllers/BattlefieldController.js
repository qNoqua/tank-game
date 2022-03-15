import { BattlefieldViews } from "../views/BattlefieldView";
import { throttle } from "../utils/helpers";


export class BattlefieldController {
    constructor(battlefield, tank, config) {                                                  //в класс контроллера пеедаем поле боя (battlefield), танк (tank), параметры танка (config)
        /* 
            класс для управления танком
            принимает поле боя, танк и его параметры
            при создании контроллера записываем в него передаваемое поле боя, танк и параметры
            записываем танк в контроллер
            
        */
        this.battlefield = battlefield;
        this.tank = tank;
        this.config = config;
        this.onKeyDown = throttle(this.onKeyDown, 150)                                        //записываем функцию в this и передаем ее в функию trottle
        this.initBattlefieldView();                                                           //вызываем метод построения макета
        this.player = battlefield.addPlayer(tank, config);                                    //добавляем игрока и его координаты
        console.log(this.player)
        this.updatePlayer();                                                                  //вызываем метод обновления игроков
        this.updateTankPosition(config.direction)
        this.eventListener();                                                                 //вызываем слушатель событий
    }
    initBattlefieldView() {                                                                   //визуализируем поле боя
        this.battlefieldView = new BattlefieldViews;                                          //создаем инстанс класса отрисовки
        this.battlefieldView.init(this.battlefield.coordinates)                               //создаем поле боя по передаваемым координатам          
    }
    updatePlayer() {                                                                          //метод для переотрисовки поля
        this.battlefieldView.update(this.battlefield.coordinates);
    }
    onKeyDown(e) {                                                                            //функция-событие
        // console.log(this);                                                                    //выводим контекст в консоль
        // console.log(e.code);                                                                  //выводим в консоль нажатую клавишу
        if (e.code === this.config.control.UP) {                                              //если нажатая клавиша === *** 
            this.moveTop();                                                                   //вызываем метод движения
            this.updatePlayer();                                                              //перерисовываем поле
        }
        if (e.code === this.config.control.DOWN) {
            this.moveDown();
            this.updatePlayer();
        }
        if (e.code === this.config.control.LEFT) {
            this.moveLeft();
            this.updatePlayer();
        }
        if (e.code === this.config.control.RIGHT) {
            this.moveRight();
            this.updatePlayer();
        }
        if (e.code === this.config.control.FIRE) {
            this.fire();
        }
    }
    eventListener() {                                                                         //слушатель событий
        document.addEventListener('keydown', (e) => this.onKeyDown(e))                        //вызываем слушатель и выполняем функцию-событие при нажатии
    }
    updateConfig(result) {                                                                    //обновление параметров танка //принимает координаты или ошибку
        if (result !== 'error') {                                                             //если пришедший результат не равен ошибке
            this.config.x = result.coordinates.x;                                             //заменить координаты танка на пришедшие координаты из result
            this.config.y = result.coordinates.y;
        }
    }
    moveTop() {                                                                               //метод движения танка
        const { x, y } = this.config;                                                         //записываем в объект текущие параметры
        const result = this.battlefield.setTankPosition(this.player.id, { y, x: x - 1 });     //вызываем метод для установки танка на позицию, отличную на 1 яечйку по каждому клику записываем в result
        this.updateConfig(result);                                                            //передаем result для обновления параметров
        this.updateTankPosition('top');
    }
    moveDown() {
        const { y, x } = this.config;
        const result = this.battlefield.setTankPosition(this.player.id, { y, x: x + 1 });
        this.updateConfig(result);
        this.updateTankPosition('down');
    }
    moveLeft() {
        const { y, x } = this.config;
        const result = this.battlefield.setTankPosition(this.player.id, { y: y - 1, x });
        this.updateConfig(result);
        this.updateTankPosition('left');
    }
    moveRight() {
        const { y, x } = this.config;
        const result = this.battlefield.setTankPosition(this.player.id, { y: y + 1, x });
        this.updateConfig(result);
        this.updateTankPosition('right');
    }
    updateTankPosition(direction) {
        this.player.coordinates.direction = direction;
        this.battlefieldView.updateTankPosition(this.player.coordinates, this.player.id, direction)

    }
    fire () {
        this.battlefield.addBullet(this.player.coordinates)
        
    }
}