import { BattlefieldViews } from "../views/BattlefieldView";
import { throttle } from "../utils/helpers";


export class BattlefieldController {
    constructor(battlefield, tank, config) {
        /* 
            класс для управления танком
            принимает поле боя, танк и его параметры
            при создании контроллера записываем в него передаваемое поле боя, танк и параметры
            записываем танк в класс контроллер
            записываем в переменную oneKeyDown функцию throttle и передаем в нее исполняемую функцию и время выполнения
            вызываем метод построения макета (при создании инстанса)
            создаем и записываем игрока в переменную player с помощью метода класса battlefield.addPlayer с передаными параметрами
            вызываем метод визуального обновления игроков и их отрисовку на поле
            обновляем направление танка
            вызываем слушатель событий
        */
        this.battlefield = battlefield;
        this.tank = tank;
        this.config = config;
        this.onKeyDown = throttle(this.onKeyDown, 150);
        this.onFireButtonPress = throttle(this.onFireButtonPress, 2000);
        this.initBattlefieldView();
        this.player = battlefield.addPlayer(tank, config);
        // console.log(this.player)
        this.updatePlayer();
        this.updateTankPosition(config.direction)
        this.eventListener();
    }
    initBattlefieldView() {
        /* 
            создаем инстанс класса отрисовки
            после создания макета визуализируем поле боя по преданным координатам (размеру)
        */
        this.battlefieldView = new BattlefieldViews;
        this.battlefieldView.init(this.battlefield.coordinates)
    }
    updatePlayer() {
        /* 
            метод для переотрисовки поля
        */
        this.battlefieldView.update(this.battlefield.coordinates);
    }
    onKeyDown(e) {
        /* 
            метод слушателей события
            если нажатая клавиша === ***,
            вызываем метод движения
            перерисовываем поле
        */
        if (e.code === this.config.control.UP) {
            this.moveTop();
            this.updatePlayer();
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
    }
    eventListener() {
        /* 
            метод вызова слушателя событий
            вызывает слушатель событий
            вызывает метод из класса Battlefield, куда передаем функцию callback
        */
        document.addEventListener('keydown', (e) => this.onFireButtonPress(e));
        document.addEventListener('keydown', (e) => this.onKeyDown(e));
        this.battlefield.addBulletUpdateCallback((bullet) => {
            this.battlefieldView.updateBulletDirection(bullet);
        })
        this.battlefield.addGameCallback((tank) => {
            console.log(tank)
            alert(`Игрок ${tank[0].tank.name} победил`)
        })
    }
    updateConfig(result) {
        /*
            обновление параметров танка 
            принимает координаты или ошибку
            если пришедший результат не равен ошибке
            заменить координаты танка на пришедшие координаты из result 
        */
        if (result !== 'error') {
            this.config.x = result.coordinates.x;
            this.config.y = result.coordinates.y;
        }
    }
    moveTop() {
        /*         
            метод движения танка
            записываем в объект текущие параметры
            вызываем метод для установки танка на позицию, отличную на 1 яечйку по каждому клику записываем в result
            передаем result для обновления параметров 
        */
        const { x, y } = this.config;
        const result = this.battlefield.setTankPosition(this.player.id, { y, x: x - 1 });
        this.updateConfig(result);
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
        /* 
            метод обновления позиции танка
            записываем переданное направление танка в его параметры
            вызываем метод визуального обновления танка
        */
        this.player.coordinates.direction = direction;
        this.battlefieldView.updateTankPosition(this.player.coordinates, this.player.id, direction)

    }
    onFireButtonPress(e) {
        /*
            если нажата кнопка FIRE, вызвать метод добавления пули addBullet у класса Battlefield
        */
        if (e.code === this.config.control.FIRE) {
            this.battlefield.addBullet(this.player.coordinates)
        }
    }
}