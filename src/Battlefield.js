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
  timers = [];
  bulletCounter = 0;
  constructor(width = 8, height = 8) {
    this.createArea(width, height);
    this.addMountains(width, height);
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
  getTankByCoords(x, y) {
    return this.tanks.find((tank) => {
      if (tank.coordinates.x === x && tank.coordinates.y === y) return true;
      return false;
    });
  }
  isTankOnCoord(x, y) {
    /* 
      метод проверки наличия танка на передаваемых координатах
      переменная ready - boolean.
      цикл перебора танков в массиве tanks
      условие: если координаты танка совпадают с переданными, вернуть true

    */
    return this.tanks.some((tank) => {
      if (tank.coordinates.x === x && tank.coordinates.y === y) return true;
      return false;
    });
  }
  isMountOnCoords(x, y) {
    /* 
      цикл перебора гор в массиве mountains
      условие: если координаты горы совпадают с переданными, отнимаем у горы HP 
      если у горы HP <= 0, вызываем метод разушения горы
      переменная ready = false
      если HP больше, ready = true
    */
    let ready = false;
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
    if (this.isMountOnCoords(coordinates.x, coordinates.y)) return 'error';
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
      с координатами, id и наносимым уроном 
      координаты пули - координата танка, смещенная на одну клетку, в сторону направления танка, для этого вызываем метод changeBulletCoordinates
      создаем timer, который вызывает setInterval,
      где если перед пулей нет препятствия (isBulletAvailable == true),
      вызываем таймер снова
     */
    const newCoordinates = this.changeBulletCoordinates(coordinates)
    const bullet = {
      coordinates: newCoordinates,
      id: this.bulletCounter,
      damage: 150,
    }
    const timer = () => setTimeout(() => {
      const isBulletAvailable = this.isBulletAvailableToMove(bullet)
      if (isBulletAvailable) {
        timer();
        if (typeof this.bulletUpdateCallback === 'function') this.bulletUpdateCallback(bullet);
      }
    }, 150);
    this.bullets.push(bullet);
    this.bulletCounter++;
    timer();
    this.updateBattlefieldCoordinates(newCoordinates, newCoordinates, INDICATORS.bullet);
    if (typeof this.bulletUpdateCallback === 'function') this.bulletUpdateCallback(bullet);
  }
  changeBulletCoordinates(coordinates) {
    /* 
      выбор началльных координат пули
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
  isBulletAvailableToMove(bullet) {
    /* 
      создаем старые координаты
      если перед пулей нет сущости или края карты, 
      координаты пули = изменить на 1 через changeBulletCoordinates
      и заменить иконки
      вернуть true
      иначе, если есть препятствие, поменять иконку пули на куст и вернуть false
    */
    const oldCoordinates = {
      x: bullet.coordinates.x,
      y: bullet.coordinates.y,
    }
    if (this.collisionBullet(bullet.id)) {
      bullet.coordinates = this.changeBulletCoordinates(bullet.coordinates);
      this.updateBattlefieldCoordinates(oldCoordinates, bullet.coordinates, INDICATORS.bullet);
      return true;
    }
    else {
      this.updateBattlefieldCoordinates(oldCoordinates, bullet.coordinates, INDICATORS.kust);
      return false;
    }

  }
  collisionBullet(id) {
    const bullet = this.bullets.find((bullet) => {
      if (bullet.id === id) return true;
      return false;
    });
    if (!bullet) return;
    let x = bullet.coordinates.x;
    let y = bullet.coordinates.y;
    // const bulletDiv = document.getAttribute('B');
    if (['top', 'down'].includes(bullet.coordinates.direction)) {
      x = x + (bullet.coordinates.direction == 'top' ? -1 : 1);

    }
    if (['left', 'right'].includes(bullet.coordinates.direction)) {
      y = y + (bullet.coordinates.direction == 'left' ? -1 : 1);
      // bullet.classList.add('bullet.coordinates.direction');
    }
    if (!this.isPointOnArea(x, y)) {
      this.removeBullet(id);
      return false;
    }
    if (this.isMountOnCoords(x, y)) {
      this.removeBullet(id);
      return false;
    }
    const tank = this.getTankByCoords(x, y)
    if (tank !== undefined) {
      const health = tank.tank.health;
      tank.tank.doDamage(bullet);
      if (health <= 0) {
        this.removeTank(tank.id);
        this.updateBattlefieldCoordinates(tank.coordinates, tank.coordinates, INDICATORS.kust)
        this.gameOverCallback(this.tanks);
      }
      return false;
    }
    return true;
  }
  removeBullet(id) {
    this.bullets = this.bullets.filter((bullet) => {
      if (id === bullet.id) return false;
      return true;
    })
  }
  addBulletUpdateCallback(callback) {
    /* 
    получает функцию-иструкцию и записывает в this
    */
    this.bulletUpdateCallback = callback;
  }
  removeTank(id) {
    this.tanks = this.tanks.filter((tank) => {
      if (id === tank.id) return false;
      return true;
    })
  }
  addGameCallback(callback) {
    this.gameOverCallback = callback;
  }
}