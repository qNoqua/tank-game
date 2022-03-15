export class BattlefieldViews {
    init(coordinates) {                                                                         //графическое отображение в браузере
        if (document.querySelector('.container') !== null) return; 
        this.coordinates = coordinates;                                                         //записываем передаваемые координаты в this
        let rootDiv = document.createElement('div');                                            //создаем див-контейнер
                                                       //отображение flex
        rootDiv.classList.add('container');                                                     //добавляем класс контейнеру
        for (let y = 0; y < coordinates.length; y++) {                                          //цикл от 0 до количества вложенных массивов в родительском массиве координат ;y++
            let row = coordinates[y];                                                           //присваиваем переменной текущий массив (строка - у)
            let rowDiv = document.createElement('div');                                         //создаем новый див (строку y)
            rowDiv.classList.add('row')
            for (let x = 0; x < row.length; x++) {                                              //запускаем цикл пока у = длинне строки координат
                let section = this.createSection(row[y], y, x);                                 //создаем ячейку с помощью метода createSection
                rowDiv.appendChild(section);                                                    //добавлям ячейку в строку
            }
            rootDiv.appendChild(rowDiv);                                                        //добавляем строку в контейнер
        }
        document.body.appendChild(rootDiv);                                                     //добавляем контейнер на страницу
    }
    update(coordinates) {                                                                       //метод обновления координат
        this.coordinates = coordinates;                                                         //записываем передаваемые координаты в this
        for (let y = 0; y < coordinates.length; y++) {                                          //цикл перебора вложенных массивов в родительском массиве
            let row = coordinates[y];                                                           //присваиваем переменной текущий массив (строка - у)
            for (let x = 0; x < row.length; x++) {                                              //перебираем каждый вложенный массив координат
                document.querySelector(`[data-y="${x}"][data-x="${y}"]`).dataset.type = row[x];  //выбираем элемент документа по дата-атрибутам и присваеваем ему текст-контент соответствующего элемента
            }
        }
    }
    createSection(content, x, y) {                                                              //метод ссоздания элементов //принимает контент для отрисовки и координаты элемента
        let section = document.createElement('div');                                            //создаем элемент и записываем его в переменную
        section.classList.add('cell')
        section.dataset.type = content;                                                          //добавляем ему контент в соответтвии с элементом массива
        section.dataset.x = x;                                                                  //добавляем дата-атрибуты каждому элементу
        section.dataset.y = y;
        return section;                                                                         //возвращаем готовый див
    }
    updateTankPosition (coordinates, playerId, direction) {
        const id$ = document.getElementById(playerId)
        if (id$) {
            id$.removeAttribute('id');
            id$.classList.remove('left', 'right', 'top', 'down');
        }
        const tank$ = document.querySelector(`[data-y="${coordinates.x}"][data-x="${coordinates.y}"]`);
        tank$.id = playerId;
        tank$.classList.add(direction);
        // console.log(document.querySelector(`[data-y="${coordinates.x}"][data-x="${coordinates.y}"]`))
    }
}