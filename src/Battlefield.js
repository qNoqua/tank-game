// coordinates = [
//   ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
//   ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
//   ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
//   ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
//   ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
//   ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
//   ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
//   ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
//   ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
// ]; пример того, как выглядит поле координат
import { INDICATORS } from "./utils/mapIndicator";
export class Battlefield {
  /*  
      класс Battlefield для создания поля боя
      tanks - массив item-ов для отрисовки на карте включает в себя танк, координаты и id
      mountains - массив гор для отрисовки на карте
      coordinates - массив c координатной сеткой (массив массивов)
      в конструктор передаем размеры поля (по-умолчанию 8х8)
      вызываем метод создания поля createArea, куда передаем высоту и ширину поля
      вызываем метод создания и расстановки Гор addMountains, куда передаем высоту и ширину поля
  */
  tanks = [];
  bullets = [];
  mountains = [];
  coordinates = [];
  constructor(width = 8, height = 8) {
    this.createArea(width, height);
    this.addMountains(width, height);
    console.log(this.coordinates)
    setInterval(() => {
      this.updateBulletPosition();
    },150)
  }
  createArea(width, height) {
    /*
      метод создания поля боя, куда передаем размеры поля
      записываем их в виде массива массивов
      запукаем цикл, где
      пееменная row - новый строчный массив, который заполняется пустыми элементами из INDICATORS
      массив - строка добавляется в общий массив
     */
    this.coordinates = [];
    for (let i = 0; i < height; i++) {
      const row = new Array(width).fill(INDICATORS.empty);
      this.coordinates.push(row);
    }
  }
  addMountains(width, height) {
    /* 
    метод создания гор в случайном количестве, но не больше суммы длинны и ширины поля * 2
    принимает длинну и ширину поля
    в цикле создается item горы, которой добавляются координаты и hp
    по координатам каждого item-a на поле создается элемент из INDICATORS
    item добавляется в массив mountains
    */
    const mountCount = Math.round((Math.random() * width) + (Math.random() * height)) * 2;
    for (let i = 0; i < mountCount; i++) {
      const x = Math.floor(Math.random() * width)
      const y = Math.floor(Math.random() * height)
      const item = {
        coordinates: { x, y },
        hp: 3,
      }
      this.coordinates[y][x] = INDICATORS.mount;
      this.mountains.push(item);
    }
  }
  addPlayer(tank, coordinates) {
    /* 
      метод создания игрока 
      принимает танк и координаты для его расстановки
      создаем item - объект, внутри которого танк, координаты и id (номер в массиве tanks)
      первая проверка: если танков в массиве больше, чем клеток - ошибка
      вторая проверка: если на передаваемых координатах есть танк - ошибка
      добавляем созданный item в массив tanks
      вызываем метод обновления поля координат
      возващаем item
    */
    const item = {
      tank: tank,
      coordinates: coordinates,
      id: this.tanks.length,
    }
    if (this.tanks.length >= this.coordinates[0].length * this.coordinates.length) return 'error';

    if (this.isTankOnCoord(item.coordinates.x, item.coordinates.y)) return 'error';

    this.tanks.push(item);
    this.updateBattlefieldCoordinates(item.coordinates, item.coordinates, INDICATORS.tank);
    return item;
  }
  isTankOnCoord(x, y) {
    /* 
      метод проверки наличия танка на передаваемых координатах
      переменная ready - boolean.
      цикл перебора танков в массиве tanks
      условие: если координаты танка совпадают с переданными, вернуть true
      цикл перебора гор в массиве mountains
      условие: если координаты горы совпадают с переданными, отнимаем у горы HP 
      если у горы HP <= 0, вызываем метод разушения горы
      переменная ready = false
      если HP больше, ready = true
    */
    let ready = false;
    for (let tank of this.tanks) {
      if (tank.coordinates.x === x && tank.coordinates.y === y) ready = true;
    }
    for (let mount of this.mountains) {
      if (mount.coordinates.x === x && mount.coordinates.y === y) {
        mount.hp--;
        if (mount.hp <= 0) {
          this.destroyMount(mount);
          ready = false;
        }
        else {
          ready = true;
        }
      }
    }
    return ready;
  }
  setTankPosition(id, coordinates) {
    /* 
      метод установки танка на позицию
      принимает id из массива танков и координаты для перемещенеия
      если танк неопределен - ошибка
      если на передаваемых координатах есть другой танк - ошибка
      если координаты невалидные - ошибка
      заменяем меняем значки клетки и танка местами
      иначе обновляем координаты танка 
    */
    let tank = this.tanks[id];
    if (tank === undefined) return 'error';
    if (this.isTankOnCoord(coordinates.x, coordinates.y)) return 'error';
    if (this.isPointOnArea(coordinates.x, coordinates.y) !== true) return 'error';
    this.updateBattlefieldCoordinates(tank.coordinates, coordinates, INDICATORS.tank);
    this.tanks[id].coordinates = coordinates;
    return tank;
  }
  isPointOnArea(x, y) {
    /* 
      проверка на выход за пределы поля
      возвращает boolean
    */
    if (x < 0 || y < 0) {
      return false;
    }
    if (x > this.coordinates[0].length - 1) {
      return false;
    }
    if (y > this.coordinates.length - 1) {
      return false;
    }
    return true;
  }
  updateBattlefieldCoordinates(oldCoordinates, newCoordinates, indicator) {
    /* 
      замена значка клетки на значок сущности
      меняем по координатам сущность на пустую клетку
      меняем пустую клетку на сущность
    */
    this.coordinates[oldCoordinates.y][oldCoordinates.x] = INDICATORS.empty;
    this.coordinates[newCoordinates.y][newCoordinates.x] = indicator;
  }
  destroyMount(item) {
    /* 
      меняем значок горы на пустую клетку
    */
    this.coordinates[item.coordinates.y][item.coordinates.x] = INDICATORS.empty;
    this.mountains = this.mountains.filter((item) => {
      // if (item.hp < 1) return false;
      //   return true;
      return item.hp > 1;
    })
  }
  addBullet(coordinates) {
    /*
      метод добавления пули
      создаем объект пули,
      с координатами и наносимым уроном 
      координаты пули - координата танка, смещенная на одну клетку, в сторону направления танка
     */
    const bullet = {
      coordinates: this.changeBulletCoordinates(coordinates),
      damage: 15,
    }
    this.bullets.push(bullet);
  }
  changeBulletCoordinates(coordinates) {
    /* 
      выбор начаьных координат пули
      если напрвление танка ****, координаты в сторону направления на 1 клетку
    */
    switch (coordinates.direction) {
      case 'top': {
        return { y: coordinates.y, x: coordinates.x - 1, direction: coordinates.direction }
      }
      case "down": {
        return { y: coordinates.y, x: coordinates.x + 1, direction: coordinates.direction }
      }
      case "left": {
        return { x: coordinates.x, y: coordinates.y - 1, direction: coordinates.direction }
      }
      case "right": {
        return { x: coordinates.x, y: coordinates.y + 1, direction: coordinates.direction }
      }
  }
  }
  updateBulletPosition() {
    /* 
      обновление позиции пули
      цикл по всем пулям в массиве
      старые координаты заменить на новые коодинаты через метод changeBulletCoordinates
      обновить координаты у пули через обновление координат updateBattlefieldCoordinates
    */
    for (let i = 0; i < this.bullets.length; i++) {
      const bullet = this.bullets[i];
      const oldCoordinates = {
        x: bullet.coordinates.x,
        y: bullet.coordinates.y,
      }
      bullet.coordinates = this.changeBulletCoordinates(bullet.coordinates);
      this.updateBattlefieldCoordinates(oldCoordinates, bullet.coordinates, INDICATORS.bullet)
    }
    console.log(this.bullets)
  }
}