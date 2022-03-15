/*
   0 1 2 3 4 5 6 7 x
 0 x x x x x x x x
 1 x x x x x x x x
 2 x x x x x x x x
 3 x x x x x x x x
 4 x x x x x x x x
 5 x x x x x x x x
 6 x x x x x x x x
 7 x x x x x x x x
 y
*/
interface isize {
  x: number,
  y: number,
}


interface iItem {
  tank: any,
  coordinates: isize,
  id: number,
}


export class Battlefield {
  coordinates = [
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
  ];
  tanks: iItem[] = [];
  size: isize = { x: 0, y: 0 };
  constructor(size: isize) {
    this.size = size;
  }
  public addPlayer(tank: any, coordinates: isize): iItem | string { // метод добавления танка на поле боя
    const item: iItem = { // создание сущности с готовым танком, координатами и id
      tank: tank,
      coordinates: coordinates,
      id: this.tanks.length,
    };


    if (this.tanks.length >= this.coordinates[0].length * this.coordinates.length) {
      return 'error';
    }

    const isTankHere: boolean = this.isTankOnCoord(item.coordinates.x, item.coordinates.y); // проверка сущности на заданных координатах
    if (isTankHere) {
      return 'error';
    }

    this.tanks.push(item);
    this.updateBattlefieldCoordinates (item, item.coordinates);
    return item;                  // в массив игроков
  }
  private isTankOnCoord(x: number, y: number): boolean { // проверка наличия сущности на заданных коодинатах
    let ready = false;
    for (let tank of this.tanks) {
      if (tank.coordinates.x === x && tank.coordinates.y === y) ready = true;
    }
    return ready;
  }
  public setTankPosition(id: number, coordinates: isize): iItem | string {       //метод проверки и изменения позиции танка
    let checkTank: iItem = this.tanks[id];                          //создаем переменную перемещаемого танка
    if (checkTank === undefined) return 'error';

    if (this.isTankOnCoord(coordinates.x, coordinates.y)) { //если на передаваемых координатах есть танк => ошибка
      return 'error';
    }
    this.tanks[id].coordinates = coordinates;
    this.updateBattlefieldCoordinates (checkTank, checkTank.coordinates) //заменить танк координаты танка с 
    return checkTank;

  }
  private updateBattlefieldCoordinates (item: iItem, coordinates: isize): void {
    this.coordinates[coordinates.y][coordinates.x] = '=8'
    this.coordinates[item.coordinates.y][item.coordinates.x] = 'x'
    console.log(this.coordinates)
  }
}

